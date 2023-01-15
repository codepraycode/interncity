// Home screen that covers base navigation for main screens
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import JobsStackScreen from './Jobs';
import LogsStackScreen from './Reviews';
import ProfileStackScreen from './Profile';
import AppSetting from './settings';

// Icon
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../constants/theme';
import { Text } from 'react-native-ui-lib';

// Stack Navigator
// const Stack = createNativeStackNavigator();
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

const AppScreens = ()=>{
    return (
        <NavigationContainer>
            {/* <Stack.Navigator>
                <Stack.Screen name='Jobs' component={JobsStackScreen}/>
            </Stack.Navigator>         */}

            <Tab.Navigator
                initialRouteName = "Jobs"
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
                    headerTransparent:true,
                    // headerTitleStyle:{
                    //     fontFamily:'FontBold',
                    //     fontSize:20,
                    //     color:Theme.main,
                    // }
                })}
            >
                <Tab.Screen name="Jobs" component={JobsStackScreen} />
                <Tab.Screen name="Logs" component={LogsStackScreen} />
                <Tab.Screen name="ProfileSetting" component={ProfileStackScreen} />
                <Tab.Screen name="AppSetting" component={AppSetting} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppScreens;