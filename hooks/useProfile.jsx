import { ref, uploadBytes } from 'firebase/storage';
import { useCallback, useContext, useMemo } from 'react';
import AppContext from '../app/context';
import { auth, storageRef } from '../app/firebaseConfig';
import { Intern } from '../app/models/Intern';
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

        // console.log("Updated document");
        updateAccountProfile(data);
        return data;
    }
    const uploadImage = async (avatar, email)=>{

      if (!avatar || !email) return null;

      const res = await fetch(avatar.uri);
      const blob = await res.blob();
      const filename = `${email}_${new Date().getTime()}`;
      const reff = ref(storageRef, `photos/${filename}`)

      await uploadBytes(reff, blob);
      
      return `https://firebasestorage.googleapis.com/v0/b/interncity-project.appspot.com/o/${reff.fullPath}`;
    }

    return [userProfile, updateProfile, uploadImage];
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