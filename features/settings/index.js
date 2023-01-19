import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import AppSettingsScreen from './AppSettings';
import Theme from '../../constants/theme';

const SettingsStack = createNativeStackNavigator();


// Create the jobs screen
const JobsStackScreen = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen 
                name="settingAll" 
                component={AppSettingsScreen} 
                options = {{
                    headerShown:false,
                    headerTransparent: false,
                    headerStyle: {backgroundColor: Theme.grey100},
                    headerShadowVisible: false,
                    // headerTitle:""
                }}
            />
        </SettingsStack.Navigator>
    )
}

export default JobsStackScreen;

const styles = StyleSheet.create({})