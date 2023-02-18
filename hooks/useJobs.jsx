import { addDoc } from 'firebase/firestore';
import React, { useContext, useMemo } from 'react';
import AppContext from '../app/context';
import { applicationsCollectionRef } from '../app/firebaseConfig';
import Job from '../app/models/Job';
import Organization from '../app/models/Organization';
import { JSONLog } from '../app/utils';

const useJob = (jobId, studentId=null)=>{

    const { 
        jobs:{data:jobs}, 
        organizations:{data:organizations},
        applications:{data:applications}
    } = useContext(AppContext);
    
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
    },[jobId, jobs]);

    const application = useMemo(()=>{

        return applications.find(e=>{
            return (e.student === studentId) && (e.job === jobId)
        });

        
    },[applications]);


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


    const sendApplication = async (job) => {
        // Job is job id
        let data = {
            date_applied: new Date(),
            declined: false,
            duration: job.duration,
            job: job.id, // job id
            job_ended: null,
            job_started:null,
            offer_date:null,

            organization: job.organization,
            student: studentId
        }

        
        try{
            await addDoc(applicationsCollectionRef, data);
        }catch(err){
            console.log("Error sending application:", err);
            throw({
                message: "Could not send application, try again."
            })
        }

        return data;
    }


    job.application = application;

    return {job, createUpdatejob, deleteJob, sendApplication};
}

const useJobs = ()=>{

    const { jobs:{data:jobs} } = useContext(AppContext);
    const loading = false;

    return [jobs, loading];
}

export {useJob, useJobs};