import passportJWT from 'passport-jwt';
import passport from 'passport';
import 'dotenv/config';
import connection from '../config/dbconnection';
import User from '../user/user.model';

export const configureJWTStratergy = () => {
  
  let opts = {};
  opts.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.secret;
  
  passport.use(
    new passportJWT.Strategy(opts, (jwt_payload, done) => {
      
        let id = jwt_payload.id;

        connection.query('Select * from users where id = ?', id, (err, result) => {

            if (err){
                console.log("error: ", err);
                return done(err, false);
            }

            //let user = User(result[0]);
            var parseUser = JSON.parse(JSON.stringify(result));

            console.log(result[0]);
            console.log(parseUser[0]);

            if(result){
                return done(null, parseUser[0]);
            } else {
                return done(null, false);
            }

        });
    })
  );
};
