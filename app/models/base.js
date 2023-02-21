import "fast-text-encoding";
import Joi from 'joi';
import { userTypes } from "../utils";

// .pattern(new RegExp('^[a-zA-Z0-9]{7,30}$'))
const passwordRegex = new RegExp('^[a-zA-Z0-9]{7,30}$');

// Schemas
const email = Joi.string().email({ tlds: { allow: false } })
const password = Joi.string()
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
                })
const type = Joi.string()
        .valid(userTypes.STUDENTS)
        .valid(userTypes.ORGANIZATION)
        .valid(userTypes.SUPERVISOR)
        .lowercase()


const location = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
})

const authDataSchema = Joi.object({
    email: email.required(),
    password: password,
});

const createAccountDataSchema = Joi.object({
    email: email.required(),
    password: password.required(),
    confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword');


const jobSchema = Joi.object({
    id: Joi.string(),
    role: Joi.string().required(),
    location: location.required(),
    organization: Joi.string().required(),
    sector: Joi.string().default(null).empty(null),//.items(Joi.string()).empty()
    stipend: Joi.number().min(1000).default(null).empty(null),
})


const userProfileDataSchema = Joi.object({
    type: type.required(),
    avatar: Joi.string().default(null),

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
    sectors: Joi.string(),// Joi.array().empty(Joi.array().length(0)),
    
}) // add constraints later

export {
    authDataSchema,
    createAccountDataSchema,
    userProfileDataSchema,
    jobSchema
}