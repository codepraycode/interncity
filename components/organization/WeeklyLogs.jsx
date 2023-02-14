import React from 'react'
import { FlatList } from 'react-native';
import LogItem from '../LogItem';

const WeeklyLogs = ({onEditLog}) => {
    
    const realDate = new Date('2022-01-02');

    const numberOfWeeks = 24; // weeksBetween(realDate);

    const weeks = [...Array(numberOfWeeks).keys()];
    const log = `Date: 1/1/2023

A sample weekly log.

supervisor: Mr Lorem Bulaba (Manager)
`
    return (
        <FlatList
            data={weeks}
            renderItem = {({item})=>(
                <LogItem
                    editLog={()=>onEditLog(item+1)} 
                    label={`Week ${item+1}`}
                    log={log}
                />
            )}
        />
    )
}

export default WeeklyLogs;