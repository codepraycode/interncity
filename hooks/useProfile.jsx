import { getAuth } from 'firebase/auth';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import AppContext from '../app/context';
import { auth } from '../app/firebaseConfig';
import { Intern } from '../app/models/Intern';
import UserAccount from '../app/models/User';
import { JSONLog } from '../app/utils';


const useProfile = ()=>{
    
    const { updateAccountProfile, userProfile } = useContext(AppContext);

    const updateProfile = async (updatedProfileData)=>{
        const data = {
            ...(userProfile || {}), // previous userProfile in context
            ...updatedProfileData // latest data update
        }

        try{
            const {isComplete, ...rest} = data;
            await UserAccount.updateProfile(auth, rest)
        }catch(err){
            console.log("Error updating document");
            throw(err);
        }

        console.log("Updated document");
        updateAccountProfile(data);
        return data;
    }

    return [userProfile, updateProfile];
}


export const useStudentActivePlacement = ()=>{
    
    const { 
        userProfile, 
        isIntern,
        applications:{data:applications}
    } = useContext(AppContext);

    const placement = useMemo(()=>{

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