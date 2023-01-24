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

        console.log(data);

        setDateEditing(null);
    }

    // console.log(dateIntervals);
    return (
        <View flex centerH>

            <FlatList
                data={ dateIntervals }
                renderItem = {({item})=><LogItem date={item} editLog={()=>setDateEditing(item)}/>}
                showsVerticalScrollIndicator={false}
            />


            <LogBottomSheet show={Boolean(dateEditing)} data={dateEditing} onDismiss={autoSaveLog}/>
            
        </View>
    )
}

export default LogsScreen;

const styles = StyleSheet.create({});