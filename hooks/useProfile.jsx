import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
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

        // console.log("update profile",data);

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

export default useProfile;