import { doc, getDoc } from 'firebase/firestore';

import { useCallback, useMemo, useState } from 'react';

import { auth, database, storageRef } from '../config/firebase';
import { Intern } from '../app/models/Intern';
import Organization from '../app/models/Organization';
import Student from '../app/models/Student';
import Supervisor from '../app/models/Supervisor';
import UserAccount from '../app/models/User';
import Job from '../app/models/Job';

import { getTimeDate, JSONLog, userTypes } from '../utils';
import useAppContext from '../context';

const studentDocRef = (id)=>doc(database, userTypes.PROFILES, id?.trim());

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
    } = useAppContext();

    const updatePlacement = (jobInstance)=>{
        const today = new Date();
        // const jobStartedDate = getTimeDate(jobInstance.job_started);
        const duration = jobInstance.duration;
        const expectedEndDate = getTimeDate(jobInstance.job_started).setMonth(duration);

        if (today >= expectedEndDate){
            // End it
            jobInstance.job_ended = expectedEndDate;
            Job.updateJob(jobInstance);
        }
    }

    const placement = useMemo(()=>{

        if(IncomingPlacement) return IncomingPlacement;
        // JSONLog(applications);
        if(!isIntern) return {};

        // Load active internAccount associated with student
        const studentId = userProfile.id;
        return applications.find((each)=> {
            updatePlacement(each);
            return Boolean(each.job_started) && (each.student === studentId)  && !Boolean(each.job_ended)
        });
    }, [userProfile, isIntern, applications]);

    const updateLog = useCallback(async (logData)=>{

        const res = await Intern.saveLog(logData);

        return res;

    },[]);

    return {placement, updateLog};
}