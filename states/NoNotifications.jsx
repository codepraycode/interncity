import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const NoNotificationScreen = () => {
    return (
        <View flex center style={{
                height:650,
            }}>
            <Text>No Notifications</Text>
        </View>
    )
}

export default NoNotificationScreen;