import React from 'react'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import JobDetail from './JobDetail';

const JobsStack = createNativeStackNavigator();


const subScreenOptions = {
    headerShown: false,
}
// Create the jobs screen
const JobsStackScreen = () => {
    return (
        <JobsStack.Navigator>
            <JobsStack.Screen 
                name="Job" 
                component={JobDetail} 
                options = { subScreenOptions }
            />
        </JobsStack.Navigator>
    )
}

export default JobsStackScreen;

const styles = StyleSheet.create({})