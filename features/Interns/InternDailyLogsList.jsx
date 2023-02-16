import React, { useContext, useMemo, useState } from 'react'
import { FlatList } from 'react-native';
import AppContext from '../../app/context';
import { getDayVerbose, JSONLog } from '../../app/utils';
import { LogBottomSheet } from '../../components/BottomSheet';
import LogItem from '../../components/LogItem';
import { useLogs } from '../../hooks/useLog';
import { useStudentActivePlacement } from '../../hooks/useProfile';
import NoStudents from '../../states/NoStudents';


const defaultLog = (index, placementId) =>({
    day: index,
    internAccount: placementId,
    daily:true,
    date: new Date(),
    log: null
})





const InternDailyLogLists = ({placement:viewingPlacement}) => {

    const {isSupervisor} = useContext(AppContext);
    // Daily logs
    const {placement, updateLog} = useStudentActivePlacement(viewingPlacement);
    const {logs} = useLogs(placement?.id, true);
    const [logEditing, setLogEditing] = useState(null);

    // console.log("logs:", logs)

    const days = useMemo(()=>{
        let res = [];

        if (!placement) return res;

        let numberOfWeeks = 24;

        for (let i=0; i<numberOfWeeks; i++){

            for (let j=0; j<7; j++){
                res.push(j);
            }            
        }

        return res;
    },[placement])


    const daysLogs = useMemo(()=>{
        let arr = [];

        days.forEach((item, i)=>{
            const log = logs.find((e)=>e.day === i);

            if (!log){
                const defaultLogData = defaultLog(i, placement?.id)
                if (isSupervisor) return;

                defaultLogData.item = item;
                return arr.push(defaultLogData);
            }

            if(!log.item) log.item = item;
            arr.push(log);
        });

        return arr
    },[logs])


    const autoSaveLog = (data=null)=> {
        // console.log(data)
        if(data?.log){
            // Save data
            // JSONLog(data);
            updateLog(data)
            .then(()=>console.log("Done!"))
            .catch(err=>console.log("Error:", err))
        }

        setLogEditing(null);
    };

    return (
        <>
            <FlatList
                data={daysLogs}
                renderItem = {({item, index})=>{

                    const dayNumber = item.item;

                    if ((dayNumber < 1) || (dayNumber > 5)) return null;

                    const dayOfWeek = getDayVerbose(dayNumber);

                    return (
                        <LogItem
                            editLog={(logData)=>setLogEditing(()=>logData)}
                            label={`${dayOfWeek}`}
                            log={item}
                        />
                    )
                }}
                ListEmptyComponent={(
                    <NoStudents 
                        title={"No daily log"}
                        message ={" "}
                    />
                )}
            />

            <LogBottomSheet
                show={Boolean(logEditing)} 
                data={logEditing}
                onDismiss={autoSaveLog}
                editable={!isSupervisor}
            />

        </>
    )
}

export default InternDailyLogLists;