// User Data and User Account Model

import { HandlerJoiError, userTypes } from "../utils";
import { userProfileDataSchema } from "./base";
import {studentsQueryRef} from '../firebaseConfig';
import { getDocs } from "firebase/firestore";

class Student {
    #original = undefined;

    get original(){
        return this.#original;
    }

    constructor(studentData){
        this.type = userTypes.STUDENTS;
        this.#original = studentData;

        const {
            // meta data
            id,
            user,

            // Location
            city,
            country,

            cv,
            email,
            fullname,
            phoneNumber,
            department,
            school,

        } = studentData || {};

        this.user = user;
        this.id = id;
        
        this.city = city;
        this.country = country;

        this.cv = cv;
        this.email = email;
        this.fullname = fullname;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.school = school;
    }

    getFormData(seed){
        let prev = {...seed};

        if (!Boolean(this.#original)) return prev;

        return {
            ...prev,
            city: this.city,
            country: this.country,

            cv: this.cv,
            email: this.email,
            fullname: this.fullname,
            phoneNumber: this.phoneNumber,
            department: this.department,
            school: this.school,
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
            fullname:{
                type: "text",
                placeholder: "Enter full name",
                label: "Full name",
            },
            cv:{
                type: "url",
                placeholder: "Enter link to CV",
                label: "CV/Resume",
            },
            phoneNumber:{
                type: "tel",
                placeholder: "Enter phone number",
                label: "Phone number",
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
            sectors:{
                type: "sector",
                placeholder: "Select sectors",
                label: "Sector",
            },
            school:{
                type: "school",
                placeholder: "Select school",
                label: "School",
            },
            department:{
                type: "department",
                placeholder: "Select department",
                label: "School Department",
            },
            // Duration: number but selected number
        
        }
    }

    static async create(data){
        console.log("create profile");
    }

    static async update(data){
        console.log("Update student data");
        
    }


    static async getSupervisorStudents(schoolId, departmentId){
        let snapshot;
        try{
            snapshot = await getDocs(studentsQueryRef);
        }
        catch(err){
            console.log("Error fetching students:", err);
            throw ("Could not fetch supervisor students");
        }


        if (snapshot.empty) return [];

        const results = snapshot.docs.map((edoc)=>({...edoc.data(), id: edoc.id}));

        return results.filter((each)=> (each.school === schoolId) && (each.department === departmentId))

    }

    static get demoData() {
        return {}
    }

}


export default Student;