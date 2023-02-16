// User Data and User Account Model

import { JSONLog, userTypes,} from "../utils";
import {
  doc,
  updateDoc,
  getDoc,
  addDoc
} from 'firebase/firestore';
import { collectionNames, database, logsCollectionRef } from "../firebaseConfig";



class Application {
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
            declined,
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
        this.declined = declined;

        this.job = null;
        this.student = null;
        this.organization = null;
    }

    async getJob (){

        const jobDocRef = doc(database, userTypes.JOBS, (this.jobId || 'id'));

        this.job = null;
        let res;

        try{
            res = await getDoc(jobDocRef);
            this.job = res.data();
        }catch(err){
            console.log("Error fetching profile:", err);
        }
        return this.job;
    }
    
    async getStudent(){
        // console.log("Student:", this.studentId)
        const studentDocRef = doc(database, userTypes.PROFILES, (this.studentId?.trim() || 'id'));

        this.student = null;
        let res;

        try{
            res = await getDoc(studentDocRef);
            this.student = res.data();
        }catch(err){
            console.log("Error fetching student profile:", err);
        }

        return this.student;
    }

    setOrganization(profile=null){
        this.organization = profile;
    }

    static async update(data){

        const { id, ...restData } = data;
        const docRef = doc(database, collectionNames.APPLICATIONS, id);

        try{
            await updateDoc(docRef, restData);
            console.log("updated Document!");
        }catch(err){
            console.log("Error updating student application:", err);
            throw({
                message: "Could not update, try again."
            })
        }

        return restData;
        
    }


}
class Intern extends Application{

    constructor(data){ // application data
        super(data);
    }

    static async saveLog(data){

        const { id, ...restData } = data;

        if(id){
            // Update Log
            const docRef = doc(database, collectionNames.LOGS, id);

            try{
                await updateDoc(docRef, restData);
                console.log("updated Document!");
            }catch(err){
                console.log("Error updating student application:", err);
                throw({
                    message: "Could not update, try again."
                });
            }

        }
        else{
            // Create Log            

            try{
                await addDoc(logsCollectionRef, restData)
            }catch(err){
                console.log("Error creating log:", err);
                throw({
                    message: "Could not create log"
                })
            }
        }

        
        return restData;
        
    }
}


export {
    Application,
    Intern
};