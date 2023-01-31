import "fast-text-encoding";
import Joi from 'joi';
import { userTypes } from "../utils";


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
}).with('password', 'confirmPassword');


const userProfileDataSchema = Joi.object({
    type: Joi.string()
        .valid(userTypes.STUDENTS)
        .valid(userTypes.ORGANIZATION)
        .valid(userTypes.SUPERVISOR)
        .lowercase()
        .required(),

    about: Joi.string(),
    website: Joi.string(),
    user: Joi.string(),
    fullname: Joi.string(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    
    school: Joi.string(),
    department: Joi.string(),

    name: Joi.string(),
    address: Joi.string(),


    phoneNumber: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    cv: Joi.string(),
    sectors: Joi.string(),
    
}) // add constraints later

export {
    authDataSchema,
    createAccountDataSchema,
    userProfileDataSchema
}