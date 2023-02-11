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



class Intern {
    #original = undefined;


    get original(){
        return this.#original;
    }

    constructor(data){ // application data
        
        this.#original = data;
        
        const {
            id,
            job,
            organization,
            
            student,
            duration,

            date_applied,
            offer_date,
            job_started,
            job_ended,
        } = data || {};

        this.id = id;
        this.jobId = job;
        this.studentId = student;
        this.organizationId = organization;

        this.duration = duration;
        this.date_applied = date_applied;
        this.offer_date = offer_date;
        this.job_started = job_started;
        this.job_ended = job_ended;

        this.job = null;
        this.student = null;
        this.organization = null;
    }

    setJob(jobInstance){
        this.job = jobInstance;
    }
    setStudent(instance){
        this.student = instance;
    }
    setOrganization(instance){
        this.organization = instance;
    }

    static async update(data){

        const { id, ...restData } = data;
        const docRef = doc(database, collectionNames.APPLICATIONS, id);

        try{
            await updateDoc(docRef, restData);
            console.log("updated Document!");
        }catch(err){
            console.log("Error updating application:", err);
            throw({
                message: "Could not update, try again."
            })
        }

        return true;
        
    }


}


export default Intern;