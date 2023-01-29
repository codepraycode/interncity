// User Data and User Account Model

import { HandlerJoiError, JSONLog, userTypes} from "../utils";
import { authDataSchema, createAccountDataSchema, userProfileDataSchema } from "./base";
import { 
  collection, 
//   addDoc, 
  getDocs,
  doc,
  getDoc,
  addDoc,
  query, where, updateDoc
//   updateDoc,
//   deleteDoc
} from 'firebase/firestore';
import { collectionNames, database } from "../firebaseConfig";

const studentProfileSchema = {
    fullname:{
        type: "text",
        placeholder: "Enter full name",
        label: "Full name",
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
    cv:{
        type: "file",
        placeholder: "Enter link to CV",
        label: "CV/Resume",
    },
    sectors:{
        type: "text",
        placeholder: "Select sectors",
        label: "Sector",
    },
    schoolId:{
        type: "text",
        placeholder: "Select school",
        label: "School",
    },
    departmentId:{
        type: "text",
        placeholder: "Select department",
        label: "School Department",
    },
    
}

const superVisorProfileSchema = {
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
    schoolId:{
        type: "text",
        placeholder: "Select school",
        label: "School",
    },
    departmentId:{
        type: "text",
        placeholder: "Select department",
        label: "School Department",
    },
    
}

const organizationProfileSchema = {
    name:{
        type: "text",
        placeholder: "Enter organization name",
        label: "Organization name",
    },
    address:{
        type: "text",
        placeholder: "Enter official address",
        label: "Official address",
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
    email:{
        type: "email",
        placeholder: "Enter official email",
        label: "Official email",
    },
    about:{
        type: "text",
        placeholder: "Enter short description about organization",
        label: "About organization",
        maxLength: 300,
        long: true,
    },
    website:{
        type: "url",
        placeholder: "Enter official website",
        label: "Official website",
    },
}


// const UserProfileConverter = {
//     toFirestore: (profile) => {
//         return {
//             name: city.name,
//             state: city.state,
//             country: city.country
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new City(data.name, data.state, data.country);
//     }
// }
class UserAccount {
    
    static async validateAuthData(authData){
        
        const {error, value} = authDataSchema.validate(authData);

        if (error){
            HandlerJoiError(error, "Invalid Login credentials");
        }
        return value;
    }
    static async validateCreateAccountData(userData){
        
        const {error, value} = createAccountDataSchema.validate(userData);

        if (error){
            HandlerJoiError(error, "Invalid user credentials");
        }
        return value;
    }
    static async validateUserProfileData(userProfile){
        
        const {error, value} = createAccountDataSchema.validate(userData);

        if (error){
            HandlerJoiError(error, "Invalid user credentials");
        }
        return value;
    }

    static getCreateAccountSchema(){
        return {
            email: {
                type: "email",
                placeholder: "Enter your email address",
                label: "Email",
            },
            password: {
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
            },
            confirmPassword: {
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
            },
        }
    }

    static getAuthSchema(){
        return {
            email: {
                type: "email",
                placeholder: "Enter your email address",
                label: "Email",
            },
            password: {
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
            },
        }
    }

    static getProfileSchema(type){

        if (type === userTypes.SUPERVISOR) return superVisorProfileSchema;
        if (type === userTypes.ORGANIZATION) return organizationProfileSchema;
        
        return studentProfileSchema;
    }

    static async getProfile(auth){
        /* 
            description: get the profile of the authenticated user
            returns: an instance of UserAccount of the user profile, or
                    null if profile is not completed/exist


            Note: This method returns an object of:
            {
                message:[a description or issue],
                data: [user profile data],
                isComplete: [true or false to check if all is well]
            }

            message will be used to update user to know why the screen is showing
            data will be null if the user has no profile
            isComplete will determine if the create profile screen will show

            this method will throw error, which will make the screen not proceed
        */

        // User is expected to have been authenticated when calling this method
        const {uid} = auth.currentUser || {};
        // eGAtI4pXeoReYrJIRo832cmzFBI3
        // const uid = "BTQDspokspSbAB9kU4NJJSBIgA42"; // authenticated user id

        console.log("Login user id:", uid);

        if (!uid) {
            throw("Authentication is required!");
        }

        const usersProfileCollectionRef = collection(database,collectionNames.USER_PROFILE);
        // queries
        const q = query(usersProfileCollectionRef, where("user", "==", uid));

        let snapshot;
        try{
            snapshot = await getDocs(q);
        }
        catch(err){
            console.log("Error fetching profile:", err);
            throw ("Could not fetch user profile")
        }        
        

        if (snapshot.empty){
            console.log("No Profile");
            return {
                message:"No Profile found",
                data: null,
                isComplete: false,
            };   
        }

        const results = snapshot.docs.map((edoc)=>({...edoc.data(), id: edoc.id}));

        const userQuery = results[0];
        const {id, ...userQueryData} = userQuery;
        // firest result is to be used

        const {error, value:validatedData} = userProfileDataSchema.validate(userQueryData);

        if (error){
            try{
                HandlerJoiError(error, "Incomplete profile");
            }catch (err){
                console.log(err);
                const {message} = err;
                return {
                    message,
                    data: userQuery,
                    isComplete:false
                }
            }
        }

        // const userProfile = {
        //     id,
        //     ...validatedData
        // }
        JSONLog(userQuery);
        return {
            message:"Fetched user data",
            data:userQuery,
            isComplete:true
        };
    }

    static async intializeProfile(auth){

        const {uid} = auth.currentUser || {};

        if (!uid){
            throw({
                message:"Authentication required!"
            })
        }

        const userProfileCollectionRef = collection(database, collectionNames.USER_PROFILE);

        try{
            await addDoc(userProfileCollectionRef, { userId: uid })
        }catch(err){
            console.log("Error initializing profile:", err);
            throw({
                message: "Could not create profile"
            })
        }

        return true;

    }


    static async updateProfile(auth, profileData){

        const {uid} = auth.currentUser || {};

        if (!uid){
            throw({
                message:"Could not update profile!"
            })
        }

        const {id, ...restProfileData} = profileData;

        const {error, value:validatedData} = userProfileDataSchema.validate(restProfileData);

        if (error){
            try{
                HandlerJoiError(error, "Incomplete profile");
            }catch (err){
                console.log(err);
                // const {message} = err;
                throw ({
                    ...err,
                    data: validatedData,
                    isComplete:false
                })
            }
        }


        try{
            const docToUpdate = doc(database, collectionNames.USER_PROFILE, id);
            await updateDoc(docToUpdate, validatedData)
        }catch(err){
            console.log("Error updating profile:", err.message);
            throw({
                message: "Could not update profile"
            })
        }

        return true;

    }

}


export {
    UserAccount,
}