import { useContext, useMemo } from 'react';
import AppContext from '../app/context';
import { Log }from '../app/models/Log';


const useLogs = (accountId, daily=false)=>{

    const {
        logs:{data:logs},
    } = useContext(AppContext);

    const logData = useMemo(()=>{
        let res = logs.filter((each)=>(each.internAccount?.trim() === accountId.trim()));

        if(daily) res = res.filter(e=>e.daily);
        else res = res.filter(e=>!e.daily);

        return res;
    },[accountId, logs])


    return { logs:logData };
}


const useLog = (logId)=>{

    const { 
        logs:{data:logs},
    } = useContext(AppContext);

    const logData = useMemo(()=>{
        const d = logs.find((each)=> each.id === logId);

        return new Log(d);
    },[logId, logs])
    

    return { log:logData };
}

export { useLogs, useLog };