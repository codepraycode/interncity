import React from 'react'
import { getDateLists, getDayVerbose } from '../../app/utils';

import { FlatList } from 'react-native';
import LogItem from '../LogItem';

export const DailyLogs = () => {

    const dateIntervals = getDateLists("2023-01-02");
    // const [dateEditing, setDateEditing] = useState(null);
    
    const log = `Date: 1/1/2023

A sample daily log.
`
    return (
        <FlatList
            data={dateIntervals.slice(0,48)}
            renderItem = {({item:date})=>{
                const realDate = new Date(date);
                const dayNumber = realDate.getDay();

                if ((dayNumber < 1) || (dayNumber > 5)) return null;

                const dayOfWeek = getDayVerbose(dayNumber);

                return (
                    <LogItem
                        editLog={()=>{}}
                        label={`${dayOfWeek} - ${date}`}
                        log={log}
                    />
                )
            }}
        />
    )
}

export default DailyLogs;