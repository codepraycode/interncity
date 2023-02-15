// Home screen that covers base navigation for screens
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native-ui-lib';

// Screen stacks
import JobsStackScreen from './Jobs';


// Icon
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../constants/theme';


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
import HeaderTitle from '../components/HeaderTitle';
import StudentListScreen from './Students/StudentsList';
import StudentStackScreen from './Students';
import InternsLogLists from './Interns/InternLogsList';


// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIcons = (name, focused, color, size, isOrganization) => {
    let screenName = name.toLowerCase();

    if (screenName === 'jobs') return <Octicons name={'list-unordered'} size={size} color={color} />;
    else if (screenName === 'logs') return <Octicons name={'file-badge'} size={size} color={color} />;
    else if ((screenName === 'interns') || (screenName === 'students')) return <Octicons name={'people'} size={size} color={color} />;
    else if (screenName === 'profilesetting') return (
        isOrganization ? 
        <Octicons name={"organization"} size={size} color={color} />
        :
        <FontAwesome name={focused ? 'user':'user-o'} size={size} color={color} />
    )
    else if (screenName === 'appsetting') return <MaterialIcons name={focused ? 'cog' : 'cog-outline'} size={size} color={color} />;    
    
    return <MaterialIcons name={'apps'} size={size} color={color} />;    
}

const getHeaderTitle = (name, color=null) => {
    let screenName = name.toLowerCase();
    
    let title = name;

    if (screenName === 'jobs') title =  "Jobs";
    else if (screenName === 'logs') title =  "Internship logs";
    else if (screenName === 'profilesetting') title =  "Profile Settings";
    else if (screenName === 'appsetting') title =  "App Settings";
    
    return (<HeaderTitle title={title} color={color}/>);
}

const commonScreenOptions = { headerShown: false }

const TabsStack = ()=>{
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
                    component={InternsLogLists} 
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
                    // position:'absolute',
                },
                headerTitle: ()=>getHeaderTitle(route.name),
                headerTitleAlign: 'center',
                headerShadowVisible:false,
                headerStyle:{
                    backgroundColor: Theme.grey100,
                },
                // headerTransparent:true,

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

const AppScreens = ()=>{
    const { 
        isIntern,
        isLoggedIn,
        isProfileComplete
    } = useContext(AppContext);
    
    let stackToRender;    

    if (!isLoggedIn) {
        stackToRender = (
            <>
                { isIntern && (
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
                        component = {TabsStack}
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