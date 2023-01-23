import React from 'react'
import { View } from 'react-native-ui-lib';
import { StyleSheet, FlatList } from 'react-native';
import LogItem from './LogItem';
import { getDateLists } from '../../app/utils';

const LogsScreen = () => {

    const dateIntervals = getDateLists("2023-01-02");
    // console.log(dateIntervals);
    return (
        <View flex centerH>

            <FlatList
                data={ dateIntervals }
                renderItem = {({item})=><LogItem date = {item}/>}
                showsVerticalScrollIndicator={false}
            />
            
        </View>
    )
}

export default LogsScreen;

const styles = StyleSheet.create({});