import React, { useState,useMemo } from 'react'
import { getDateLists, getDayVerbose } from '../../app/utils';

import { FlatList } from 'react-native';
import LogItem from '../LogItem';
import { LogBottomSheet } from '../BottomSheet';
import { useLogs } from '../../hooks/useLog';
import { useStudentActivePlacement } from '../../hooks/useProfile';

export const DailyLogs = () => {

    const {placement} = useStudentActivePlacement();
    const {logs} = useLogs("7aw575C5IZoMmo2QrqcE");
    const [logEditing, setLogEditing] = useState(null);

    const days = useMemo(()=>{
        let res = [];
        let numberOfWeeks = 24;

        for (let i=0; i<numberOfWeeks; i++){

            for (let j=0; j<7; j++){
                res.push(j);
            }            
        }

        return res;
    },[])
    

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
            />

            <LogBottomSheet
                show={Boolean(logEditing)} 
                data={log}
                onDismiss={autoSaveLog}
            />
        </>
    )
}

export default DailyLogs;