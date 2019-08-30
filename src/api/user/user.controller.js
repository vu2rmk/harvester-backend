import userService from './user.service';
import connection from '../config/dbconnection';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED
} from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
  async signup(req, res) {
    try {
      //validate the request
      const { error, value } = userService.validateSchema(req.body);

      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }

      //generate hash before inserting
      const hashPassword = await userService.generateHash(value);
      value.password = hashPassword;

      //create new user

      await connection.query(
        'Insert into users set ?',
        value,
        (err, results) => {
          if (err) {
            return res.status(BAD_REQUEST).json(err);
          }

          return res.json(results);
        }
      );

      // return res.json(value);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },

  async login(req, res) {
    try {
      const { error, value } = userService.validateLoginSchema(req.body);

      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }

      await connection.query('Select * from users where username = ?', value.username, async (err, result) => {
          
        if (err) {
            return res.status(BAD_REQUEST).json(err);
          }

          const user = result[0];

          const matched = await bcrypt.compare(value.password, user.password);

          if (!matched) {
            return res.status(UNAUTHORIZED).json({ err: 'Invalid credentials' });
          }

          const token = jwt.sign({id: user.id}, process.env.secret, {expiresIn: '1d'});

          return res.json({success: true, token: token});

        }
      );
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },

  test(req, res){

    res.json({msg: 'Everything is fine here!'});
  }
};
