import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AppContext from '../app/context';
import { app } from '../app/firebaseConfig';
import useProfile from './useProfile';

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

        if (!organizationProfile) {
            console.log("Job organization not found:", jobOrganizationId);
            return null
        }; 

        // Add company details to it
        const {type, ...restProfileData} = organizationProfile;
        job.company = restProfileData;

    }, [jobs])

    return [jobData];
}

const useJobs = ()=>{

    const { jobs, loadJobs, isOrganization } = useContext(AppContext);
    const [organizationProfile] = useProfile();

    const initialState = {
        loading: false,
        settingUp: jobs.length < 1,
        error:null,
        jobs,
    }

    const reducer = (prev, action) =>{
        switch (action.type){
            case "UPDATE_STATE":
                return {
                    ...prev,
                    ...action.payload,
                }
            default:
                return {...prev}
        }
    }

    const [stateData, dispatch] = useReducer(reducer, initialState);


    useEffect(()=>{
        const setUpJobs = ()=>{
            const {settingUp} = stateData;

            if(!settingUp) return;
            
            loadJobs()
            .then(()=>{
                dispatch({
                    type: "UPDATE_STATE",
                    payload:{
                        settingUp: false,
                    }
                    
                });
            })
            .catch((err)=>{
                console.log("Error loading jobs", err);

                dispatch({
                    type: "UPDATE_STATE",
                    payload:{
                        settingUp: false,
                        error: "Could not load jobs"
                    }
                });
            })
        }

        setUpJobs();
    }, []);

    
    const reloadJobs = async ()=>{
        let organizationId = null;

        if (isOrganization){
            organizationId = organizationProfile.id;
        }

        try{
            await loadJobs(organizationId);
        }
        catch(err){
            console.log("Error reloading jobs:", err);
        }

        return;
        
    }


    return [stateData, reloadJobs];
}

export {useJob, useJobs};