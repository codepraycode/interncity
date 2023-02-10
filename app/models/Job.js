// User Data and User Account Model

import { HandlerJoiError, JSONLog, userTypes} from "../utils";
import { jobSchema } from "./base";
import { 
  collection, 
//   addDoc, 
  getDocs,
  doc,
//   getDoc,
  addDoc,
  query, where, updateDoc
//   updateDoc,
//   deleteDoc
} from 'firebase/firestore';
import { collectionNames, database } from "../firebaseConfig";


class Job {
    #original = undefined;


    get original(){
        return this.#original;
    }

    constructor(jobData){
        // console.log("Created a job instance!", jobData);
        this.#original = jobData;
        
        const {
            company,
            id,
            location,
            organization,
            sector,
            stipend,
            role,
        } = jobData;

        this.company = company;
        this.id = id;
        this.location = location;
        this.organization = organization;
        this.sector = sector;
        this.stipend = stipend;
        this.role = role;
    }

    getFormData(seed){
        let prev = {...seed};

        if (!Boolean(this.#original)) return prev;

        const {address, city, country} = this.location || {};
        return {
            ...prev,
            role: this.role,
            stipend: this.stipend,
            sector: this.sector,
            
            address: address,
            city: city,
            country: country,
        }
    }
    
    static async validateJobData(jobData){        
        
        const {error, value} = authDataSchema.validate(authData);

        if (error){
            HandlerJoiError(error, "Invalid Job data");
        }
        return value;
    }

    static getJobSchema(){

        return {
            role: {
                type: "text",
                placeholder: "Enter job role",
                label: "Job role",
            },
            // Location
            address:{
                type: "text",
                placeholder: "Enter job address",
                label: "Job address",
            },
            city:{
                type: "text",
                placeholder: "Enter job city location",
                label: "Job city",
            },
            country:{
                type: "text",
                placeholder: "Enter job country",
                label: "Job country",
            },
            // 
            // organization: organization id
            stipend:{
                type: "number",
                placeholder: "stipend per month",
                label: "Stipend per month",
            },
            sector:{
                type: "sector",
                placeholder: "Select role sector",
                label: "Job sector",
            },
        }
    }

    static async updateJob(auth, jobData){
        console.log("Update job data:", jobData);
    }

}


export default Job;