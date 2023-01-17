import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import Theme from '../constants/theme';

const NotificationScreen = () => {
    return (
        <View flex center style={{backgroundColor:Theme.grey100}}>
            <Text>Notification Screen!</Text>
        </View>
    )
}

const styles = StyleSheet.create({});
export default NotificationScreen;