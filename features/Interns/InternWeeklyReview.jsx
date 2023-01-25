// import { View, Text, } from 'react-native-ui-lib';
import React from 'react'
import WeeklyLog from '../Reviews/WeeklyLog';
import { weeksBetween } from '../../app/utils';
import { FlatList } from 'react-native';

const InternWeekelyReview = ({onEditLog}) => {
    
    const realDate = new Date('2022-01-02');

    const numberOfWeeks = weeksBetween(realDate);

    const weeks = [...Array(numberOfWeeks).keys()];
    return (
        <FlatList
            data={weeks}
            renderItem = {({item})=><WeeklyLog editLog={()=>onEditLog(item+1)} label={`Week ${item+1}`}/>}
        />
    )
}

export default InternWeekelyReview;