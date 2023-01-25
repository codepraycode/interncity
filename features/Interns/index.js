import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Theme from '../../constants/theme';
import InternsDetailScreen from './InternDetail';
import InternsListScreen from './InternsList';

const InternsStack = createNativeStackNavigator();


// Create the jobs screen
const InternsStackScreen = () => {
    return (
        <InternsStack.Navigator>
            <InternsStack.Screen 
                name="InternDetail" 
                component={InternsDetailScreen} 
                options = {{
                    headerTransparent: false,
                    headerStyle: {backgroundColor: Theme.grey100},
                    headerShadowVisible: false,
                    headerTitle:""
                }}
            />
        </InternsStack.Navigator>
    )
}

export {
    InternsStackScreen,
    // InternsDetailScreen,
    InternsListScreen
};