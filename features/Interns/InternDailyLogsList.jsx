import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native';
import { getDayVerbose } from '../../app/utils';
import { LogBottomSheet } from '../../components/BottomSheet';
import LogItem from '../../components/LogItem';
import { useLogs } from '../../hooks/useLog';
import { useStudentActivePlacement } from '../../hooks/useProfile';
import NoStudents from '../../states/NoStudents';

const InternDailyLogLists = () => {
    // Daily logs
    const {placement} = useStudentActivePlacement();
    const {logs} = useLogs(placement?.id);
    const [logEditing, setLogEditing] = useState(null);

    console.log("placement:", placement)

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
    

    const autoSaveLog = (logData)=>{

        setLogEditing(null);
    }

    const log = `Date: 1/1/2023

A sample daily log.
`
    return (
        <>
            <FlatList
                data={days}
                renderItem = {({item:dayNumber, index})=>{

                    if ((dayNumber < 1) || (dayNumber > 5)) return null;

                    const dayOfWeek = getDayVerbose(dayNumber);

                    return (
                        <LogItem
                            editLog={(logData)=>setLogEditing(logData || {
                                day: index,
                                internAccount: placement?.id,
                                daily:true,
                                date: new Date(),
                                log: null,
                            })}
                            label={`${dayOfWeek}`}
                            log={log}
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
                data={log}
                onDismiss={autoSaveLog}
            />
        </>
    )
}

export default InternDailyLogLists;