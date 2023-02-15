import { getAuth } from 'firebase/auth';
import React, { useContext, useMemo, useState } from 'react';
import AppContext from '../app/context';
import { auth } from '../app/firebaseConfig';
import UserAccount from '../app/models/User';


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
    
    const { userProfile, isIntern } = useContext(AppContext);

    const placement = useMemo(()=>{
        if(!isIntern) return {};

        // Load active internAccount associated with student

        return {};
    }, [userProfile, isIntern])

    return {placement};
}

export default useProfile;