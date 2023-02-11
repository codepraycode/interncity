import { useContext, useMemo } from 'react';
import AppContext from '../app/context';
import Intern from '../app/models/Intern';

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

    const { applications:{data:applications} } = useContext(AppContext);

    const data = useMemo(()=>{
        return applications.find((each)=> each.id === applicationId);
    },[applicationId])

    

    return { data };
}

export { useApplications, useApplication };