// Home screen that covers base navigation for screens
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAppContext from '../context';
import { screenNames } from '../config/screens';

// Screens
import Onboarding from './Onboarding';
import LoginScreen from './Login';
import CreateAccountScreen from './CreateAccount';
import { Text, View } from 'react-native-ui-lib';


// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const Home = ()=>{
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Already Logged In.</Text>
        </View>
    )
}

const AppScreens = ({ isFresh }) => {
    const {
        isLoggedIn,
        isProfileComplete
    } = useAppContext();

    let screnStackToRender;

    if (!isLoggedIn) {
        screnStackToRender = (
            <>
                {isFresh && (
                    <Stack.Screen
                        name={screenNames.onboarding}
                        component={Onboarding}
                    />)
                }
                <Stack.Screen
                    name={screenNames.login}
                    component={LoginScreen}
                // options = {{headerShown: false}}
                />
                <Stack.Screen
                    name={screenNames.createAccount}
                    component={CreateAccountScreen}
                // options = {{headerShown: false}}
                />
            </>
        )
    }
    else {
        screnStackToRender = (
            <Stack.Screen
                name={screenNames.home}
                component={Home}
            // options = {{headerShown: false}}
            />
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                {screnStackToRender}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens;