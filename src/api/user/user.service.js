import Joi  from 'joi';
import bcrypt from 'bcryptjs';

export default {

    validateSchema(body){

        const schema = Joi.object().keys({

            email: Joi.string()
            .email()
            .required(),

            username: Joi.string()
            .required(),

            password: Joi.string()
            .required()
            
        });


        const {error, value} = Joi.validate(body, schema);

        if(error && error.details){
            return { error };
        }
        return { value };
    },

    async generateHash(body){

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(body.password, salt);

        return hash;
    },

    validateLoginSchema(body){
        
        const schema = Joi.object().keys({

            username: Joi.string()
            .required(),

            password: Joi.string()
            .required()
            
        });

        const {error, value} = Joi.validate(body, schema);

        if(error && error.details){
            return { error };
        }

        return { value };
    }
}