import { getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import AppContext from '../app/context';
import { app } from '../app/firebaseConfig';
import useProfile from './useProfile';

const useJob = (jobId=null)=>{
    const auth = getAuth(app);
    const { jobs: allJobs, loadJobs, isOrganization } = useContext(AppContext);
    const [organizationProfile] = useProfile();

    let job;

    if(jobId){
        job = jobs.find(e=>e.id === jobId);

        if (!job) return;

        // Add company details to it
        const {type, ...restProfileData} = organizationProfile;

        job.company = restProfileData;
    }

    const reloadJobs = ()=>{
        let organizationId = null;

        if (isOrganization){
            organizationId = organizationProfile.id;
        }

        loadJobs(organizationId);
    }


    return [job, allJobs, reloadJobs];
}

export default useJob;