import "fast-text-encoding";
import Joi from 'joi';


const passwordRegex = new RegExp('^[a-zA-Z0-9]{7,30}$');

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
                    let passwordErrorMessage = "Password must be at least 8 charaters, and not contain numbers and alphabets"
                    
                    if (value.length < 8){
                        console.log("Less than 8");
                        return helper.message(passwordErrorMessage)
                    }

                    if (!passwordRegex.test(value)){
                        console.log("Failed regex");
                        return helper.message(passwordErrorMessage)
                    }


                    return value;
                }).required(),
    confirmPassword: Joi.ref('password')
        // .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$')),
}).with('password', 'confirmPassword');;

export {
    authDataSchema,
    createAccountDataSchema,
}