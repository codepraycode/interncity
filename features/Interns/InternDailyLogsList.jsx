import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native';
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
    

    const autoSaveLog = (data=null)=> {
        if(data){
            // Save data
            JSONLog(data);
            updateLog(data)
            .then(()=>console.log("Done!"))
            .catch(err=>console.log("Error:", err))
        }

        setLogEditing(null);
    };

    return (
        <>
            <FlatList
                data={days}
                renderItem = {({item:dayNumber, index})=>{

                    if ((dayNumber < 1) || (dayNumber > 5)) return null;

                    const dayOfWeek = getDayVerbose(dayNumber);

                    const log = logs.find((e)=>e.day === index);

                    return (
                        <LogItem
                            editLog={(logData)=>setLogEditing(()=>logData)}
                            label={`${dayOfWeek}`}
                            log={log || defaultLog(index, placement?.id)}
                        />
                    )
                }}
                ListEmptyComponent={(
                    <NoStudents 
                        title={"No Placement"}
                        message ={"No active placement in an organization yet"}
                    />
                )}
            />

            <LogBottomSheet
                show={Boolean(logEditing)} 
                data={logEditing}
                onDismiss={autoSaveLog}
            />
        </>
    )
}

export default InternDailyLogLists;