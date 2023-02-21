// Home screen that covers base navigation for screens
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

// Screen stacks
import JobsStackScreen from './Jobs';

// Screens
import { 
    ProfileFormScreen,
    ProfileCreationOnboarding,
    ProfileSuccessScreen,
    ProfileSettingScreen,
    ProfileUserTypeScreen
} from './Profile';
import AppSettingsScreen from './settings';
import {JobListsScreen} from './Jobs/JobLists';
import NotificationScreen from './Notifications/NotificationList';
import UpdatePasswordScreen from './settings/UpdatePassword';
import {InternsListScreen, InternsStackScreen} from './Interns';

import AppContext from '../app/context';

import { AuthOnboardingScreen, CreateAccountScreen, LoginScreen } from './authentication';
import HeaderRight from '../components/HeaderRight';
import {getIcons, getHeaderTitle} from '../components/AppHeader';
import StudentListScreen from './Students/StudentsList';
import StudentStackScreen from './Students';
import InternDailyLogLists from './Interns/InternDailyLogsList';


// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const commonScreenOptions = { headerShown: false }

const HomeTabsStack = ()=>{
    const {isOrganization, isSupervisor} = useContext(AppContext);

    const renderScreen = ()=>{

        if (isOrganization) return (
            <>
                <Tab.Screen 
                    name="Interns" 
                    component={InternsListScreen}
                />
            </>
        )

        if (isSupervisor) return (
            <>
                <Tab.Screen 
                    name="Students" 
                    component={StudentListScreen} 
                />
            </>
        )

        return (
            <>
                <Tab.Screen 
                    name="Logs" 
                    component={InternDailyLogLists} 
                />
            </>
        )
    }

    return (

        <Tab.Navigator
            // initialRouteName = "Jobs"
            screenOptions={({ route, navigation })=>({
                tabBarIcon: ({focused, color, size})=> getIcons(route.name, focused, color, size, isOrganization),
                tabBarActiveTintColor: Theme.accent,
                tabBarInactiveTintColor: Theme.grey300,
                tabBarShowLabel: false,
                tabBarStyle:{
                    height: 65,
                },
                headerTitle: ()=>getHeaderTitle(route.name),
                headerTitleAlign: 'center',
                headerShadowVisible:false,
                headerStyle:{
                    backgroundColor: Theme.grey100,
                },
                headerRight: ()=> (
                    <HeaderRight 
                        type={isSupervisor ? "settings": 'notification'} 
                        onPress={()=> {
                            if (isSupervisor) return navigation.navigate("SupervisorAppSetting")
                            navigation.navigate("Notification")
                        }}
                    />
                )
            })}
        >
            {!isSupervisor && <Tab.Screen name="Jobs" component={JobListsScreen} />}

            {renderScreen()}

            <Tab.Screen 
                name="ProfileSetting"
                component={ProfileSettingScreen} 
                options={({ route, navigation })=>({
                headerTitle: ()=>getHeaderTitle(route.name, Theme.grey100),
                headerTransparent: true,

                headerRight: ()=> (
                    <HeaderRight 
                        type={isSupervisor ? "settings": 'notification'}
                        light={true}
                        onPress={()=> {
                            if (isSupervisor) return navigation.navigate("SupervisorAppSetting")
                            navigation.navigate("Notification")
                        }}
                    />
                )
            })}
            />

            {
                !isSupervisor && (
                    <Tab.Screen 
                        name="AppSetting" 
                        component={AppSettingsScreen} 
                        options={({ route, navigation })=>({
                            headerTitle: ()=>getHeaderTitle("Settings"),
                            headerRight: ()=> (null)
                        })}
                    />
                )
            }
        </Tab.Navigator>
    )
}

const AppScreens = ({ isFresh })=>{
    const { 
        isLoggedIn,
        isProfileComplete
    } = useContext(AppContext);
    
    let stackToRender;    

    if (!isLoggedIn) {
        stackToRender = (
            <>
                { isFresh && (
                    <Stack.Screen 
                        name="AuthOnboarding" 
                        component={AuthOnboardingScreen}
                    />)
                }
                <Stack.Screen 
                    name="SignIn" 
                    component={LoginScreen} 
                    // options = {{headerShown: false}}
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={CreateAccountScreen} 
                    // options = {{headerShown: false}}
                />
            </>
        )
    }
    else if (!isProfileComplete){
        stackToRender = (
            <>
                <Stack.Screen 
                    name="ProfileOnboarding" 
                    component={ProfileCreationOnboarding}
                />
                <Stack.Screen 
                    name="ProfileUserType" 
                    component={ProfileUserTypeScreen}
                />
                <Stack.Screen 
                    name="ProfileForm" 
                    component={ProfileFormScreen} 
                    options = {{
                        headerShown: true,
                        // headerTransparent: true,
                        headerShadowVisible: false,
                        headerStyle:{
                            backgroundColor: Theme.grey100,
                        },
                        headerTitle: ()=>getHeaderTitle("Create profile"),
                        headerTitleAlign:'center'
                    }}
                />
                <Stack.Screen 
                    name="ProfileSuccess" 
                    component={ProfileSuccessScreen} 
                    // options = {{headerShown: false}}
                />
            </>
        )
    }
    else{
        stackToRender = (
            <>
                {/* Hide header for home screens */}
                    <Stack.Screen 
                        name="Home" 
                        component = {HomeTabsStack}
                    />
                    <Stack.Screen name="Job" component={JobsStackScreen} />
                    <Stack.Screen name="Intern" component={InternsStackScreen} />
                    <Stack.Screen name="Student" component={StudentStackScreen} />

                    <Stack.Screen 
                        name="Notification" 
                        component={NotificationScreen} 
                        options={{
                            headerShown: true,
                            // headerTransparent: true,
                            headerStyle:{
                                backgroundColor:Theme.grey100,
                            },
                            headerShadowVisible:false,
                            headerTitleAlign:'center',
                            headerTitle: ()=>(
                                <Text 
                                    h3
                                    style={{
                                        marginTop: 40,
                                        paddingBottom: 10,
                                    }}
                                >
                                    Notifications
                                </Text>
                            )
                        }}
                    />

                    <Stack.Screen 
                        name="settingUpdatePassword" 
                        component={UpdatePasswordScreen} 
                        options={{
                            headerShown: true,
                            // headerTransparent: true,
                            headerStyle:{
                                backgroundColor:Theme.grey100,
                            },
                            headerShadowVisible:false,
                            headerTitleAlign:'center',
                            headerTitle: ()=>(
                                <Text 
                                    h3
                                    style={{
                                        paddingTop: 60,
                                        paddingBottom: 10,
                                    }}
                                >
                                    Update password
                                </Text>
                            )
                        }}
                    />

                    <Stack.Screen 
                        name="SupervisorAppSetting" 
                        component={AppSettingsScreen} 
                        options={({ route, navigation })=>({
                            headerTitle: ()=>getHeaderTitle("Settings"),
                            headerRight: ()=> (null),
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerShadowVisible:false,
                            headerStyle:{
                                backgroundColor: Theme.grey100,
                            },
                        })}
                    />
            </>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={ commonScreenOptions }
            >
                {stackToRender}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens;