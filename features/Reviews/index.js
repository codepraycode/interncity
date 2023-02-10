import React, { useState } from 'react'
import { View } from 'react-native-ui-lib';
import { StyleSheet, FlatList } from 'react-native';
import LogItem from './LogItem';
import { getDateLists } from '../../app/utils';
import { LogBottomSheet } from '../../components/BottomSheet';

const LogsScreen = () => {

    const dateIntervals = getDateLists("2023-01-02");
    const [dateEditing, setDateEditing] = useState(null);


    const autoSaveLog = (data)=>{

        setDateEditing(null);
    }

    const log = `Date: 1/1/2023

A sample daily log.
`

    // console.log(dateIntervals);
    return (
        <View flex>

            <FlatList
                data={ dateIntervals }
                renderItem = {({item})=><LogItem date={item} log={log} editLog={()=>setDateEditing(item)}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems:'center'
                }}
            />


            <LogBottomSheet show={Boolean(dateEditing)} data={log} onDismiss={autoSaveLog}/>
            
        </View>
    )
}

export default LogsScreen;

const styles = StyleSheet.create({});