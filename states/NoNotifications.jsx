import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const NoNotificationScreen = () => {
    return (
        <View flex center style={{backgroundColor:Theme.grey100}}>
            <Text>No Notifications</Text>
        </View>
    )
}

export default NoNotificationScreen;