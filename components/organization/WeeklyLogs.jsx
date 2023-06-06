import React, { useContext, useMemo } from 'react'
import { FlatList } from 'react-native';
import AppContext from '../../app/context';
import { JSONLog } from '../../utils';
import { useLogs } from '../../hooks/useLog';
import NoStudents from '../../states/NoStudents';
import LogItem from '../LogItem';


const WeeklyLogs = ({internId, onEditLog}) => {

    const {isSupervisor} = useContext(AppContext);

    const {logs} = useLogs(internId);

    const numberOfWeeks = 24; // weeksBetween(realDate);

    const weeksLogs = useMemo(()=>{
        const arr = [];

        [...Array(numberOfWeeks).keys()].forEach((item, i)=>{
            const log = logs.find(e=>e.week === Number(i));
            if (!log){
                const defaultLog = {
                    week: Number(i), // index
                    item,
                    internAccount: internId,
                    daily:false,
                    date: new Date(),
                    log: null,
                }


                if (isSupervisor) return;
                return arr.push(defaultLog);
            }

            if(!log.item) log.item = item;

            arr.push(log);
        })

        return arr;
    }, [logs])

    return (
        <FlatList
            data={weeksLogs}
            renderItem = {({item})=>(
                <LogItem
                    week={item}
                    editLog={(logData)=>onEditLog(logData)}
                    label={`Week ${item.item +1}`}
                    log={item}
                />
            )}
            ListEmptyComponent={(
                <NoStudents
                    title={"No weekly logs"}
                    message ={" "}
                />
            )}
        />
    )
}

export default WeeklyLogs;