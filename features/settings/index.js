import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import AppSettingsScreen from './AppSettings';
import Theme from '../../constants/theme';
import UpdatePasswordScreen from './UpdatePassword';

const SettingsStack = createNativeStackNavigator();


// Create the jobs screen
const SettingsStackScreen = () => {
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
            {/* <SettingsStack.Screen 
                name="settingUpdatePassword"
                component={UpdatePasswordScreen} 
                options = {{
                    headerShown:false,
                    // headerTransparent: false,
                    headerStyle: {backgroundColor: Theme.grey100},
                    headerShadowVisible: false,
                    // headerTitle:""
                }}
            /> */}
        </SettingsStack.Navigator>
    )
}

export default SettingsStackScreen;

const styles = StyleSheet.create({})