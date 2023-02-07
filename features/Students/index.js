import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import StudentDetail from './StudentDetail';
import Theme from '../../constants/theme';
import PlacementDetail from './PlacementInfo';

const StudentStack = createNativeStackNavigator();


// Create the jobs screen
const StudentStackScreen = () => {
    return (
        <StudentStack.Navigator>
            <StudentStack.Screen 
                name="StudentDetail" 
                component={StudentDetail} 
                options = {{
                    headerTransparent: false,
                    headerStyle: {backgroundColor: Theme.grey100},
                    headerShadowVisible: false,
                    headerTitle:""
                }}
            />
            <StudentStack.Screen 
                name="StudentPlacementDetail" 
                component={PlacementDetail} 
                options = {{
                    headerTransparent: false,
                    headerStyle: {backgroundColor: Theme.grey100},
                    headerShadowVisible: false,
                    headerTitle:""
                }}
            />
        </StudentStack.Navigator>
    )
}

export default StudentStackScreen;
