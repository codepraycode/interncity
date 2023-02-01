import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../constants/theme';
import { getDayVerbose } from '../../app/utils';

const LogItem = ({date, editLog}) => {

    const realDate = new Date(date);

    const dayNumber = realDate.getDay();

    if ((dayNumber < 1) || (dayNumber > 5)) return null;

    const dayOfWeek = getDayVerbose(dayNumber);

    const log = "Lorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjasLorefdsafkljsdkfajsdklfjalsdkfjasd;klfjasdklfj;asdlkfjas"
    const breakLength = 188;
    
    return (
        <TouchableOpacity 
            activeOpacity={0.4} 
            onPress={editLog}
            style={{
                backgroundColor:Theme.white,                
                padding: 10,
                marginVertical:10,
                height: 120,
                width: 350,
                maxWidth: "95%",
                borderRadius: 4,

                overflow:'hidden',
            }}
        >
            {/* Title */}
            <Text label style={{
                marginBottom: 10,
            }}>
                {dayOfWeek}
            </Text>

            {/* Content */}
            <View style={{ height: "100%"}}>

                {
                    (!log || log.length <1) ?
                    <Text i center style={{color: Theme.grey300, fontSize: 18}}>
                        No log
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

const styles = StyleSheet.create({});