import React, { useContext, useMemo } from 'react';
import AppContext from '../app/context';

const useJob = (jobId)=>{
    const { jobs, organizations } = useContext(AppContext);
    
    const jobData = useMemo(()=>{
        
        const job = jobs.find(e=>e.id === jobId);

        if (!job) {
            console.log("Job not found:", jobId);
            return null
        };

        const jobOrganizationId = job.organization;

        const organizationProfile = organizations.find(e=>e.id === jobOrganizationId);

        // console.log(jobOrganizationId, organizations)
        if (!organizationProfile) {
            console.log("Job organization not found:", jobOrganizationId);
            return null
        }; 

        // Add company details to it
        const {type, ...restProfileData} = organizationProfile;
        job.company = restProfileData;

        return job;
    })

    

    return [jobData];
}

const useJobs = ()=>{

    const { jobs } = useContext(AppContext);
    const loading = false;

    return [jobs, loading];
}

export {useJob, useJobs};