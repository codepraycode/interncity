// User Data and User Account Model

import { JSONLog, userTypes,} from "../utils";
import {
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { collectionNames, database } from "../../config/firebase";



class Log {
    #original = undefined;


    get original(){
        return this.#original;
    }

    constructor(data){ // application data
        
        this.#original = data;
        
        const {
            id,
            daily,
            date,
            
            internAccount,
            log,
        } = data || {};

        this.id = id;
        this.daily = daily;
        this.date = date;
        this.internAccount = internAccount;

        this.log = log;
    }

    static async update(data){

        const { id, ...restData } = data;
        const docRef = doc(database, collectionNames.LOGS, id);

        try{
            await updateDoc(docRef, restData);
            console.log("updated Document!");
        }catch(err){
            console.log("Error updating log:", err);
            throw({
                message: "Could not update, try again."
            })
        }

        return restData;
        
    }

}


export {
    Log
};