import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import JobDetail from './JobDetail';

const JobsStack = createNativeStackNavigator();


// Create the jobs screen
const JobsStackScreen = () => {
    return (
        <JobsStack.Navigator>
            <JobsStack.Screen 
                name="JobDetail" 
                component={JobDetail} 
                options = {{
                    headerTransparent: true,
                    headerTitle: ""
                }}
            />
        </JobsStack.Navigator>
    )
}

export default JobsStackScreen;

const styles = StyleSheet.create({})