// User Data and User Account Model

import { HandlerJoiError, JSONLog, userTypes} from "../utils";
import { 
    authDataSchema, 
    createAccountDataSchema, 
    userProfileDataSchema 
} from "./base";
import { 
  collection, 
  getDocs,
  doc,
  addDoc,
  query,
  where,
  updateDoc
} from 'firebase/firestore';
import { collectionNames, database } from "../../config/firebase";
import Supervisor from "./Supervisor";
import Organization from "./Organization";
import Student from "./Student";



const createAccountSchema = {
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

const signInSchema = {
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

class UserAccount {
    
    static async validateAuthData(authData){
        // console.log("Auth data:", authData)
        
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

    static getCreateAccountSchema(){
        return createAccountSchema;
    }

    static getAuthSchema(){
        return signInSchema;
    }

    static getProfileSchema(type){

        if (type === userTypes.SUPERVISOR) return Supervisor.formSchema();
        if (type === userTypes.ORGANIZATION) return Organization.formSchema();
        
        return Student.formSchema();
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
        const {uid} = auth.currentUser || {};;

        if (!uid) {
            throw("Authentication is required!");
        }

        const usersProfileCollectionRef = collection(database, collectionNames.USER_PROFILE);
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
            throw("User account not established!")
        }

        const results = snapshot.docs.map((edoc)=>({...edoc.data(), id: edoc.id}));
        // JSONLog(results)

        const userQuery = results[0];
        const {id, ...userQueryData} = userQuery;
        // firest result is to be used

        const { error } = userProfileDataSchema.validate(userQueryData);

        if (error){
            try{
                HandlerJoiError(error, "Incomplete profile");
            }catch (err){
                console.log("Error::", err);
                const {message} = err;
                return {
                    message,
                    data: userQuery,
                    isComplete:false
                }
            }
        }
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
            await addDoc(userProfileCollectionRef, { user: uid, createdAt: new Date() })
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


export default UserAccount;