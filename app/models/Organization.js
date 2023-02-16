// User Data and User Account Model

import { HandlerJoiError, userTypes,} from "../utils";
import { userProfileDataSchema } from "./base";


class Organization {
    #original = undefined;

    constructor(orgData){
        this.type = userTypes.ORGANIZATION;
        this.#original = orgData;

        const {
            // meta data
            id,
            user,

            // Location
            address,
            city,
            country,

            name,
            about,
            email,
            website

        } = orgData || {};

        this.user = user;
        this.id = id;
        
        this.address = address;
        this.city = city;
        this.country = country;

        this.name = name;
        this.about = about;
        this.email = email;
        this.website = website;
    }

    get original(){
        return this.#original;
    }

    getFormData(seed){
        let prev = {...seed};

        if (!Boolean(this.#original)) return prev;

        return {
            ...prev,
            user: this.user,
            id: this.id,
            
            address: this.address,
            city: this.city,
            country: this.country,

            name: this.name,
            about: this.about,
            email: this.email,
        }
    }
 
    static async validateData(userData){

        const {error, value} = userProfileDataSchema.validate(userData);

        if (error){
            HandlerJoiError(error, "Invalid Job info");
        }
        
        return value;
    }

    static getSchema(){

        return {
            name:{
                type: "text",
                placeholder: "Enter organization name",
                label: "Organization name",
            },
            email:{
                type: "email",
                placeholder: "Enter official email",
                label: "Official email",
            },
            about:{
                type: "long",
                placeholder: "Enter short description about organization",
                label: "About organization",
                maxLength: 300,
                long: true,
            },
            website:{
                type: "url",
                placeholder: "Enter official website",
                label: "Official website",
            },
            address:{
                type: "text",
                placeholder: "Enter official address",
                label: "Official address",
            },
            city:{
                type: "text",
                placeholder: "Enter residential city",
                label: "City",
            },
            country:{
                type: "text",
                placeholder: "Enter residential country",
                label: "Country",
            },
        }
    }

    static async create(data){
        console.log("create profile");
    }

    static async update(data){
        console.log("Update organization data");
        
    }

    static get demoData() {
        return {}
    }

}


export default Organization;