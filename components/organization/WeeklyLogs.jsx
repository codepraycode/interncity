import React from 'react'
import { FlatList } from 'react-native';
import { JSONLog } from '../../app/utils';
import { useLogs } from '../../hooks/useLog';
import LogItem from '../LogItem';

const WeeklyLogs = ({internId, onEditLog}) => {

    const {logs} = useLogs(internId);

    const numberOfWeeks = 24; // weeksBetween(realDate);

    const weeks = [...Array(numberOfWeeks).keys()];
    return (
        <FlatList
            data={weeks}
            renderItem = {({item})=>(
                <LogItem
                    week={item}
                    editLog={(logData)=>onEditLog(logData || {
                        week: item,
                        internAccount: internId,
                        daily:false,
                        date: new Date(),
                        log: null,
                    })} 
                    label={`Week ${item+1}`}
                    log={logs.find(e=>e.week === Number(item))}
                />
            )}
        />
    )
}

export default WeeklyLogs;