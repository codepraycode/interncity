import { useContext, useMemo } from 'react';
import AppContext from '../app/context';
import Intern, { Application } from '../app/models/Intern';
import { JSONLog } from '../app/utils';
import useProfile from './useProfile';

const useApplications = (organizationId=null)=>{

    const { applications:{data:applications} } = useContext(AppContext);

    const data = useMemo(()=>{
        return applications.filter((each)=> each.organization === organizationId);
    },[organizationId])

    const updateViewed = async (id)=>{

        let error;

        try{
            await Intern.update({
                id,
                viewed: new Date(),
            })
        }catch(err){
            error = err;
        }

        return error;
    }

    return {data, updateViewed};
}


const useApplication = (applicationId)=>{

    const { 
        applications:{data:applications},
        userProfile
    } = useContext(AppContext);

    useProfile

    // Get student info
    // Get Job
    // Create application object

    const data = useMemo(async ()=>{
        const applicationData = applications.find((each)=> each.id === applicationId);

        const application = new Application(applicationData);

        await application.setJob();
        await application.setStudent();
        await application.setOrganization(userProfile);

        return application;
    },[applicationId])

    

    return { data };
}

export { useApplications, useApplication };