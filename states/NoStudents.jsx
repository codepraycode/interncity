import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const NoStudents = ({title, message, isOrganization}) => {
    return (
        <View 
            center 
            style={{
                height:650,
            }}
        >
            <Text h3 style={{color:Theme.grey400, marginBottom:10,}}>
                {
                    title ||
                    `No ${isOrganization ? "Intern" : "student"}`
                }
            </Text>
            <Text p center style={{width: 250}}>

                <Text>
                    {
                        message ||
                        `${isOrganization ? "Check your notifications for students applications" : "No student is associated with your department and school yet"}`
                        
                    }
                </Text>
            </Text>
        </View>
    )
}

export default NoStudents;
