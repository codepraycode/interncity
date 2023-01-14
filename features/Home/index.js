// Home screen that covers base navigation for main screens
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import JobsLists from './JobsLists';

// Stack Navigator
const Stack = createNativeStackNavigator();

const HomeStackNavigator = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Jobs' component={JobsLists}/>
            </Stack.Navigator>           
        </NavigationContainer>
    )
}

export default HomeStackNavigator;