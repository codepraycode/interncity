import React, { useContext, useMemo } from 'react';
import AppContext from '../app/context';
import Job from '../app/models/Job';

const useJob = (jobId)=>{

    const { jobs:{data:jobs}, organizations:{data:organizations} } = useContext(AppContext);
    
    const job = useMemo(()=>{

        let jobData = jobs.find(e=>e.id === jobId);
        let organizationProfile;

        if (jobData?.organization) {
            const jobOrganizationId = jobData.organization;
            organizationProfile = organizations.find(e=>e.id === jobOrganizationId);
        };

        // console.log(jobOrganizationId, organizations)
        if (organizationProfile) {
            const {type, ...restProfileData} = organizationProfile;
            jobData.company = restProfileData;
        };

        return new Job(jobData);
    });


    const createUpdatejob = async (jobData) => {
        // TODO: create/update job, return errors if any.
        return
    }

    return {job, createUpdatejob};
}

const useJobs = ()=>{

    const { jobs:{data:jobs} } = useContext(AppContext);
    const loading = false;

    return [jobs, loading];
}

export {useJob, useJobs};