import "fast-text-encoding";
import Joi from 'joi';


const authDataSchema = Joi.object({
    email: Joi.string()
            // .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$'))
            .email({ tlds: { allow: false } })
            .required(),
    password: Joi.string()
                .custom((value, helper)=>{
                    if (value.length < 8){
                        return helper.message("Password must be at least 8 charaters long")
                    }

                    return value;
                })
        // .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),
});

const createAccountDataSchema = Joi.object({
    email: Joi.string()
            // .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$'))
            .email({ tlds: { allow: false } })
            .required(),
    password: Joi.string()
                .custom((value, helper)=>{
                    if (value.length < 8){
                        return helper.message("Password must be at least 8 charaters long")
                    }

                    return value;
                }),
    confirmPassword: Joi.ref('password'),
        // .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),
});

export {
    authDataSchema,
    createAccountDataSchema,
}