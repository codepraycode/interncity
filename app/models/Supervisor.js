// User Data and User Account Model

import { userTypes } from "../utils";


class Supervisor {
    #original = undefined;

    get original(){
        return this.#original;
    }

    constructor(instanceData = {}){
        this.type = userTypes.SUPERVISOR;
        this.#original = instanceData;

        const {
            // meta data
            id,
            user,

            email,
            fullname,
            department,
            school,

        } = instanceData;

        this.user = user;
        this.id = id;

        this.email = email;
        this.fullname = fullname;

        // School
        this.department = department;
        this.school = school;
    }

    getFormData(seed){
        let prev = {...seed};

        if (!Boolean(this.#original)) return prev;

        return {
            ...prev,

            email: this.email,
            fullname: this.fullname,
            
            department: this.department,
            school: this.school,
        }
    }
 
    static formSchema(){

        return {
            avatar:{
                type: "image",
                placeholder: "upload a .png, .jpeg or .jpg image",
                label: "Profile photo",
            },
            fullname:{
                type: "text",
                placeholder: "Enter full name",
                label: "Full name",
            },

            email:{
                type: "email",
                placeholder: "Enter official email",
                label: "Official email",
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

        }
;
    }

    static async update(data){
        console.log("Update student data");
        
    }

    static get demoData() {
        return {}
    }

}


export default Supervisor;