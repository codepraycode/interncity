
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const LogItem = ({label, week, log:logData, editLog}) => {

    const breakLength = 178;

    const log = logData ? logData.log: "";
    
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
                    <Text i center style={{color: Theme.grey300, fontSize: 12}}>
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

export default LogItem;