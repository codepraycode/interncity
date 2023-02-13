// User Data and User Account Model

import { JSONLog, userTypes,} from "../utils";
import {
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { collectionNames, database } from "../firebaseConfig";



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

    async setJob (){

        const jobDocRef = doc(database, userTypes.JOBS, this.jobId);

        let job = null;
        let res;

        try{
            res = await getDoc(jobDocRef);
        }catch(err){
            console.log("Error fetching profile:", err);
            this.job = job;
            return;
        }

        this.job = res.data();
    }
    
    async setStudent(){
        // console.log("Student:", this.studentId)
        const studentDocRef = doc(database, userTypes.PROFILES, this.studentId);

        let student = null;
        let res;

        try{
            res = await getDoc(studentDocRef);
        }catch(err){
            console.log("Error fetching student profile:", err);
            this.student = student;
            return;
        }

        this.student = res.data();
    }

    async setOrganization(profile=null){
        this.organization = profile;
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
class Intern extends Application{

    constructor(data){ // application data
        super(data);
    }
}


export {
    Application,
    Intern
};