import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const NoJobs = ({isOrganization}) => {
    return (
        <View 
            center 
            style={{
                height:650,
            }}
        >
            <Text h3 style={{color:Theme.grey400, marginBottom:10,}}>
                No Jobs {isOrganization && "available"}
            </Text>
            <Text p center style={{width: 250}}>
            { isOrganization ? 
                <Text>You haven't created any job</Text>
                :
                <Text>Update your profile to see jobs related to your interest</Text>
            }
            </Text>
        </View>
    )
}

export default NoJobs;
