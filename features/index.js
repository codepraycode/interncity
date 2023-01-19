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
import NotificationScreen from './Notifications';
import { TouchableOpacity } from 'react-native';

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

const getHeaderTitle = (name, color=null) => {
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
                    color:color ? color: Theme.main,
                }}
            >
                {title}
            </Text>;
}

const commonScreenOptions = { headerShown: false }

const HomeStack = ()=>{
    return (

        <Tab.Navigator
            // initialRouteName = "Jobs"
            screenOptions={({ route, navigation })=>({
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

                headerRight: ()=> (
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("Notification")}
                    >
                        <Octicons 
                            name={'bell'} 
                            size={25} 
                            color={Theme.accent} 
                            style={{paddingRight: 20}}
                        />
                    </TouchableOpacity> 
                )
            })}
        >
            <Tab.Screen name="Jobs" component={JobListsScreen} />
            <Tab.Screen name="Logs" component={LogsScreen} />
            <Tab.Screen 
                name="ProfileSetting"
                component={ProfileScreen} 
                options={({ route, navigation })=>({
                headerTitle: ()=>getHeaderTitle(route.name, Theme.grey100),
                headerTransparent: true,

                headerRight: ()=> (
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("Notification")}
                    >
                        <Octicons 
                            name={'bell'} 
                            size={25} 
                            color={Theme.grey100} 
                            style={{paddingRight: 20}}
                        />
                    </TouchableOpacity> 
                )
            })}
            />
            <Tab.Screen name="AppSetting" component={AppSettingsScreen} />
        </Tab.Navigator>
    )
}

const AppScreens = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={ commonScreenOptions }
            >
                {/* Hide header for home screens */}
                <Stack.Screen 
                    name="Home" 
                    component = {HomeStack}
                />
                <Stack.Screen name="Job" component={JobsStackScreen} />

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens;