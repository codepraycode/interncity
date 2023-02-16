// User Data and User Account Model

import { HandlerJoiError, JSONLog,} from "../utils";
import { jobSchema } from "./base";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { collectionNames, database, jobsCollectionRef } from "../firebaseConfig";



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
            createdAt,
        } = jobData || {};

        this.company = company;
        this.id = id;
        this.location = location;
        this.organization = organization;
        this.sector = sector;
        this.stipend = stipend;
        this.role = role;
        this.createdAt = createdAt;


        this.application = null;
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

    static serializeFormData(data, up=false){
        // Up for make up by adding location field, down for deserialize by breaking location field

        if (up){

            const {address, city, country, ...rest} = data;
    
            return {
                ...rest,
                location:{
                    address,
                    city,
                    country
                }      
            }
        }

        

        const {location, ...rest} = data;

        const {address, city, country,} = location;

        return {
            ...rest,
            address,
            city,
            country   
        }


    }
    
    static async validateJobData(jobData){

        const data = Job.serializeFormData(jobData, true);
        
        const {error, value} = jobSchema.validate(data);

        if (error){
            HandlerJoiError(error, "Invalid Job info");
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

    static async createUpdateJob(jobData){
        const { id } = jobData;

        if(id){
            return Job.updateJob(jobData);
        }

        if(!jobData.createdAt) jobData.createdAt = new Date();

        return Job.createJob(jobData);
    }

    static async createJob(jobData){
        // console.log("Create job data:", jobData);
        const {id, ...restData} = jobData;
        
        try{
            await addDoc(jobsCollectionRef, restData);
        }catch(err){
            console.log("Error creating job:", err);
            throw({
                message: "Could not create job, check job data and try again."
            })
        }

        return true;
        
    }

    static async updateJob(jobData){
        // console.log("Update job data:", jobData);

        const { id, ...restData } = jobData;
        const docRef = doc(database, collectionNames.JOBS, id);

        try{
            await updateDoc(docRef, restData);
            console.log("updated Document!");
        }catch(err){
            console.log("Error updating job:", err);
            throw({
                message: "Could not update job, check job data and try again."
            })
        }

        return true;
        
    }

    static async deleteJob(jobId){
        const docRef = doc(database,collectionNames.JOBS, jobId);

        try{
            await deleteDoc(docRef);
            console.log("Deleted Document!");
        }catch(err){
            console.log("Error getting job:", err);
        }
        
    }

    static get demoData() {
        return {
            address: "Ikosi",
            city: "Lagos",
            country: "Nigeria",
            organization: "organization@codepraycode.com",
            role: "Product manager intern",
            sector: "VzPGaw4SmSZfmqtdFEUU",
            // stipend: 40000,
        }
    }

}


export default Job;