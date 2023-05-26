// Entity models
import { getDoc, getDocs, query } from "firebase/firestore";
import { userTypes } from "../config/constants";
import { ProfilesCollectionRef } from "../config/firebase";
import { ProfileValidatorSchema, createAccountValidatorSchema, handleSchemaError, loginValidatorSchema } from "./schema";

async function loadProfile(auth) {
    // Check if user is authenticated
    const { uid } = auth.currentUser || {};

    if (!uid) {
        throw ("Authentication is required!");
    }

    // User profile query
    const q = doc(ProfilesCollectionRef, uid);
    // Parse snapshot
    let snapshot;
    try{
        snapshot = await getDoc(q);
    }
    catch (err) {
        console.log("Error fetching profile:", err);
        throw ("Could not fetch user profile")
    }

    if (!snapshot.exists()) {
        throw ("No Profile")
    }

    return {...snapshot.data(), id: snapshot.id};
}

// Profile Classes
class Organization {
    #original = undefined;
    type = userTypes.ORGANIZATION;
    meta = {}

    constructor(rawData) {
        this.#original = rawData;
        // ALl other data is set in serialize
        this.serialize();
    }

    serialize() {
        // Using the orginal data

        if (!this.#original){
            console.log("No original data for Organization");
            return
        }

        const {
            // meta data
            id,
            user,
            avatar,

            // Location
            address,
            city,
            country,

            name,
            about,
            email,
            website

        } = this.#original;

        this.user = user;
        this.id = id;
        this.avatar = avatar;

        this.address = address;
        this.city = city;
        this.country = country;

        this.name = name;
        this.about = about;
        this.email = email;
        this.website = website;
    }

    deserialize(seed={}) {

        if (!this.#original){
            console.log("No original data for Organization");
            return seed;
        }

        return {
            ...seed,
            user: this.user,
            id: this.id,
            avatar: this.avatar,

            address: this.address,
            city: this.city,
            country: this.country,

            name: this.name,
            about: this.about,
            email: this.email,
            website: this.website
        }
    }

    get original() {
        return this.#original;
    }

    static async save() {
        // Create/update profile
    }
}


class Supervisor {
    #original = undefined;
    type = userTypes.SUPERVISOR;
    meta = {}

    constructor(rawData) {
        this.#original = rawData;
        // ALl other data is set in serialize
        this.serialize();
    }

    serialize() {
        // Using the orginal data

        if (!this.#original){
            console.log("No original data for Supervisor");
            return
        }

        const {
            // meta data
            id,
            user,
            avatar,

            email,
            fullname,
            department,
            school,

        } = this.#original;

        this.user = user;
        this.id = id;
        this.avatar = avatar;

        this.email = email;
        this.fullname = fullname;

        // School
        this.department = department;
        this.school = school;
    }

    deserialize(seed={}) {

        if (!this.#original){
            console.log("No original data for Organization");
            return seed;
        }

        return {
            ...seed,
            user: this.user,
            id: this.id,
            avatar: this.avatar,

            email: this.email,
            fullname: this.fullname,

            department: this.department,
            school: this.school,
        }
    }

    get original() {
        return this.#original;
    }

    static async save() {
        // Create/update profile
    }
}

class Student {
    #original = undefined;
    type = userTypes.STUDENTS;
    meta = {}

    constructor(rawData) {
        this.#original = rawData;
        // ALl other data is set in serialize
        this.serialize();
    }

    serialize() {
        // Using the orginal data

        if (!this.#original){
            console.log("No original data for Supervisor");
            return
        }

        const {
            // meta data
            id,
            user,
            avatar,

            // Location
            city,
            country,

            cv,
            email,
            fullname,
            phoneNumber,
            department,
            school,

        } = this.#original;

        this.user = user;
        this.id = id;
        this.avatar = avatar;

        this.city = city;
        this.country = country;

        this.cv = cv;
        this.email = email;
        this.fullname = fullname;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.school = school;
    }

    deserialize(seed={}) {

        if (!this.#original){
            console.log("No original data for Student");
            return seed;
        }

        return {
            ...seed,
            avatar: this.avatar,
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

    get original() {
        return this.#original;
    }

    static async save() {
        // Create/update profile
    }
}


class User {
    // Base class for any user

    // Validatators
    static async validateLogin (loginData) {
        const { error, value } = loginValidatorSchema.validate(loginData);

        // if there is an error, throw, otherwise return value
        handleSchemaError(error, "Invalid login credentials");

        return value;
    }

    static async validateCreateAccount (data) {
        const { error, value } = createAccountValidatorSchema.validate(data);

        // if there is an error, throw, otherwise return value
        handleSchemaError(error, "Invalid user credentials");

        return value;
    }

    static async getProfile (auth) {
        /* 
            Based on auth instance, load authenticated user profile
            and return an instance of profile class

            Default is Student instance
        */

        // Load profile
        //  appropriate errors should be caught in front screen
        let user = await loadProfile(auth); // returns an object

        // Validate incoming data if complete
        const {id, ...restData} = user;
        const { error } = ProfileValidatorSchema.validate(restData);

        // if there is an error, throw, otherwise return value
        const schemaPayload = handleSchemaError(error, "Incomplete profile", false);

        // Return appropriate Profile instance
        return User.newProfile(restData, meta = schemaPayload);
    }

    // Instance creators
    static newProfile(rawData, meta={}) {
        const { type } = rawData;

        let instance;

        switch (type) {
            case userTypes.ORGANIZATION:
                instance = new Organization(rawData);
                break
            case userTypes.SUPERVISOR:
                instance = new Supervisor(rawData);
                break
            default:
                instance = new Student(rawData);
                break
        }

        instance.meta = meta;

        return instance; // return an instance of profile;
    }

    static async getSupervisorStudents({ schoolId, departmentId }) {
        // Load and return an array of Student instances
        //  Students that are related to supervisor by school and department

        const studentsQueryRef = query(ProfilesCollectionRef, where("type", "==", userTypes.STUDENTS));

        let snapshot;
        try {
            snapshot = await getDocs(studentsQueryRef);
        }
        catch (err) {
            console.log("Error fetching students:", err);
            throw ("Could not get students");
        }

        if (snapshot.empty) return [];

        const data = snapshot.docs.map((item) => ({ ...item.data(), id: item.id }));

        return data.filter((item) => {
            const isSameSchool = item.school === schoolId
            const isSameDepartment = item.department === departmentId

            if (isSameSchool && isSameDepartment) return User.newProfile(item);
        })
    }
}


export default User;