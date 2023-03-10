import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../constants/theme';

const WeeklyLog = ({label, editLog}) => {

    const log = `Date: 1/1/2023

A sample weekly log.

supervisor: Mr Lorem Bulaba (Manager)
`
    const breakLength = 178;
    
    return (
        <TouchableOpacity 
            activeOpacity={0.4} 
            onPress={editLog}
            style={{
                backgroundColor:Theme.white,                
                padding: 10,
                marginVertical:10,
                marginHorizontal:20,
                height: 120,
                width: 350,
                maxWidth: "90%",
                borderRadius: 4,
                overflow:'hidden',
            }}
        >
            {/* Title */}
            <Text label style={{
                marginBottom: 10,
            }}>
                {label}
            </Text>

            {/* Content */}
            <View style={{ height: "100%"}}>

                {
                    (!log || log.length <1) ?
                    <Text i center style={{color: Theme.grey300, fontSize: 18}}>
                        No log yet
                    </Text>
                    :
                    <Text p style={{paddingHorizontal: 10,}}>
                        {log.substring(0,breakLength) + (log.length > breakLength ? '...':'')}
                    </Text>
                }
                
            
            </View>
        </TouchableOpacity>
    )
}

export default WeeklyLog;

const styles = StyleSheet.create({});