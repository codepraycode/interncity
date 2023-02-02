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
    
    static async validateJobData(jobData){        
        
        const {error, value} = authDataSchema.validate(authData);

        if (error){
            HandlerJoiError(error, "Invalid Job data");
        }
        return value;
    }

    static getJobSchema(){

        console.log(jobSchema.describe());

        return {
            title: {
                type: "text",
                placeholder: "Enter job title",
                label: "Job title",
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
            sectors:{
                type: "sector",
                placeholder: "Select sectors",
                label: "Job sector",
            },
        }
    }

    static async updateJob(auth, jobData){
        console.log("Update job data:", jobData);
    }

}


export default Job;