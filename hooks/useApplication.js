import { useContext, useMemo } from 'react';
import AppContext from '../app/context';

const useApplications = (organizationId=null)=>{

    const { applications:{data:applications} } = useContext(AppContext);

    console.log(organizationId)
    
    const data = useMemo(()=>{
        return applications.filter((each)=> each.organization === organizationId);
    },[organizationId])

    return data;
}

export { useApplications };