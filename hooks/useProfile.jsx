import { doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../app/context';
import { auth, database, storageRef } from '../app/firebaseConfig';
import { Intern } from '../app/models/Intern';
import Organization from '../app/models/Organization';
import Student from '../app/models/Student';
import Supervisor from '../app/models/Supervisor';
import UserAccount from '../app/models/User';
import { JSONLog, userTypes } from '../app/utils';

const studentDocRef = (id)=>doc(database, userTypes.PROFILES, id?.trim());

const useProfile = ()=>{
    
    const { updateAccountProfile, userProfile, showToast } = useContext(AppContext);

    const updateProfile = async (updatedProfileData)=>{

        const {avatar:rawUpload, email:emailData, ...restData} = updatedProfileData;
        let avatar = null;
        let email = emailData;
        if(!email){
            email = userProfile.email;
        }

        try{
            avatar = await uploadImage(rawUpload, email);
        }
        catch(err){
            console.log("Error upload image:", err);
            showToast("Could not update profile photo");
        }

        const combinedData = {
            ...(userProfile || {}), // previous userProfile in context
            // ...updatedProfileData // latest data update
            email, 
            ...restData
        }

        if (avatar) combinedData.avatar = avatar;

        try{
            const {isComplete, ...rest} = combinedData;
            JSONLog(updatedProfileData);
            await UserAccount.updateProfile(auth, rest)
        }catch(err){
            console.log("Error updating document");
            throw(err);
        }

        // console.log("Updated document");
        updateAccountProfile(combinedData);
        return combinedData;
    }
    const uploadImage = async (avatar, email)=>{

        if (!avatar && !email) return null;

      const res = await fetch(avatar.uri);
      const blob = await res.blob();
      const filename = `${email}_${new Date().getTime()}`;
      const reff = ref(storageRef, `photos/${filename}`)

      await uploadBytes(reff, blob);
      
      return reff.fullPath;
    }

    return [userProfile, updateProfile, uploadImage];
}

export const useAProfile = (profileId)=>{
    const [profile, setProfile] = useState(null);


    useMemo(async ()=>{
        let res;

        try{
            res = await getDoc(studentDocRef(profileId));
            setProfile(()=>res.data());
        }catch(err){
            console.log("Error fetching profile:", err);
        }
    }, [profileId]);


    // Determine profile type and return instance
    let profileInstance;

    switch (profile?.type){
        case userTypes.STUDENTS:
            profileInstance = new Student(profile);
        case userTypes.ORGANIZATION:
            profileInstance = new Organization(profile);
        case userTypes.SUPERVISOR:
            profileInstance = new Supervisor(profile);
        default:
            profileInstance = profile;
    }

    return [profileInstance];
}

export const useStudentActivePlacement = (IncomingPlacement=null)=>{
    
    const { 
        userProfile, 
        isIntern,
        applications:{data:applications}
    } = useContext(AppContext);

    const placement = useMemo(()=>{

        if(IncomingPlacement) return IncomingPlacement;
        // JSONLog(applications);
        if(!isIntern) return {};

        // Load active internAccount associated with student
        const studentId = userProfile.id;
        return applications.find((each)=> Boolean(each.job_started) && (each.student === studentId));;
    }, [userProfile, isIntern, applications]);

    const updateLog = useCallback(async (logData)=>{

        const res = await Intern.saveLog(logData);

        return res;

    },[]);

    return {placement, updateLog};
}

export default useProfile;