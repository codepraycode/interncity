// Home screen that covers base navigation for screens
import React from 'react';
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
import LogsScreen from './Reviews';
import ProfileScreen from './Profile';
import AppSettingsScreen from './settings';
import JobListsScreen from './Jobs/JobLists';

// Stack Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIcons = (name, focused, color, size) => {
    let screenName = name.toLowerCase();

    if (screenName === 'jobs') return <Octicons name={'list-unordered'} size={size} color={color} />;
    else if (screenName === 'logs') return <Octicons name={'file-badge'} size={size} color={color} />;
    else if (screenName === 'profilesetting') return <FontAwesome name={focused ? 'user':'user-o'} size={size} color={color} />;
    else if (screenName === 'appsetting') return <MaterialIcons name={focused ? 'cog' : 'cog-outline'} size={size} color={color} />;    
    
    return <MaterialIcons name={'apps'} size={size} color={color} />;    
}

const getHeaderTitle = (name) => {
    let screenName = name.toLowerCase();
    
    let title = name;

    if (screenName === 'jobs') title =  "Jobs";
    else if (screenName === 'logs') title =  "Internship logs";
    else if (screenName === 'profilesetting') title =  "Profile Settings";
    else if (screenName === 'appsetting') title =  "App Settings";
    
    return <Text 
                style={{
                    fontFamily:'FontBold',
                    fontSize:20,
                    color:Theme.main,
                }}
            >
                {title}
            </Text>;
}

const HomeStack = ()=>{
    return (

        <Tab.Navigator
            // initialRouteName = "Jobs"
            screenOptions={({ route })=>({
                tabBarIcon: ({focused, color, size})=> getIcons(route.name, focused, color, size),
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

                headerRight: ()=> <Octicons name={'bell'} size={25} color={Theme.accent} style={{paddingRight: 20}}/>
            })}
        >
            <Tab.Screen name="Jobs" component={JobListsScreen} />
            <Tab.Screen name="Logs" component={LogsScreen} />
            <Tab.Screen name="ProfileSetting" component={ProfileScreen} />
            <Tab.Screen name="AppSetting" component={AppSettingsScreen} />
        </Tab.Navigator>
    )
}

const AppScreens = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Hide header for home screens */}
                <Stack.Screen 
                    name="Home" 
                    component = {HomeStack}
                    options = {({ route })=>({
                        headerShown: false
                    })}
                />
                <Stack.Screen name="Job" component={JobsStackScreen} />
                {/* <Stack.Screen name="Settings" component={Settings} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens;