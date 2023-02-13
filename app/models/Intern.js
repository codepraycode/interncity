// User Data and User Account Model

import { HandlerJoiError, JSONLog, userTypes,} from "../utils";
import { jobSchema } from "./base";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  getDoc
} from 'firebase/firestore';
import { collectionNames, database, jobsCollectionRef, studentsQueryRef } from "../firebaseConfig";



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

        //console.log("Job Id",this.jobId)// Nuj5KJ7RC9737YXFz31V

        const jobDocRef = doc(database, userTypes.JOBS, this.jobId);

        let job = null;

        try{
            doc = await getDoc(jobDocRef);
        }catch(err){
            console.log("Error fetching profile:", err);
            this.job = job;
            return;
        }

        this.job = doc.data();

        this.job = job;
    }
    
    async setStudent(){
        const q = query(studentsQueryRef, where("id", "==", this.studentId));
        let student = null;
        let snapshot;

        try{
            snapshot = await getDocs(q);
        }catch(err){
            console.log("Error fetching student:", err);
            this.student = student;
            return;
        }

        if (snapshot.empty){
            console.log("No Student found!");
        }else{
            const results = snapshot.docs[0]; //.map((edoc)=>({...edoc.data(), id: edoc.id}));
            
            student = {...results.data(), id: results.id}
        }

        this.student = student;
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