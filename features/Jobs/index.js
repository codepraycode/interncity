import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import JobDetail from './JobDetail';
import Theme from '../../constants/theme';

const JobsStack = createNativeStackNavigator();


// Create the jobs screen
const JobsStackScreen = () => {
    return (
        <JobsStack.Navigator>
            <JobsStack.Screen 
                name="JobDetail" 
                component={JobDetail} 
                options = {{
                    headerTransparent: false,
                    headerStyle: {backgroundColor: Theme.grey100},
                    headerShadowVisible: false,
                    headerTitle:""
                }}
            />
        </JobsStack.Navigator>
    )
}

export default JobsStackScreen;

const styles = StyleSheet.create({})