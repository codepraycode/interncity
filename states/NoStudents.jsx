import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const NoStudents = ({isOrganization}) => {
    return (
        <View 
            center 
            style={{
                height:650,
            }}
        >
            <Text h3 style={{color:Theme.grey400, marginBottom:10,}}>
                No {isOrganization ? "Intern" : "student"}
            </Text>
            <Text p center style={{width: 250}}>
            { isOrganization ? 
                <Text>Check your notifications for students applications</Text>
                :
                <Text>No student is associated with your department and school yet</Text>
            }
            </Text>
        </View>
    )
}

export default NoStudents;
