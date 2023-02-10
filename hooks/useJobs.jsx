import React, { useContext, useMemo } from 'react';
import AppContext from '../app/context';
import Job from '../app/models/Job';
import Organization from '../app/models/Organization';
import { JSONLog } from '../app/utils';

const useJob = (jobId)=>{

    const { jobs:{data:jobs}, organizations:{data:organizations} } = useContext(AppContext);
    
    const job = useMemo(()=>{

        let jobData = jobs.find(e=>e.id === jobId);

        let organizationProfile;

        if (jobData?.organization) {
            
            const {organization: organizationId} = jobData;
            organizationProfile = organizations.find(e=>e.id === organizationId);
        };

        if (organizationProfile) {
            const org = new Organization(organizationProfile);
            jobData.company = org;
        };

        return new Job(jobData);
    },[jobId]);


    const createUpdatejob = async (jobData) => {
        // TODO: create/update job, return errors if any.
        let error;

        try{
            await Job.createUpdateJob(jobData);
        }
        catch(err){
            error = err;
        }

        return error;
    }

    const deleteJob = async (jobId) => {
        // TODO: create/update job, return errors if any.
        let error;

        try{
            await Job.deleteJob(jobId);
        }
        catch(err){
            error = err;
        }

        return error;
    }

    return {job, createUpdatejob, deleteJob};
}

const useJobs = ()=>{

    const { jobs:{data:jobs} } = useContext(AppContext);
    const loading = false;

    return [jobs, loading];
}

export {useJob, useJobs};