import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateProfile from '../Profile/CreateProfile';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Onboarding from './Onboarding';

const AuthStack = createNativeStackNavigator();


const AuthenticationStack = ({ isDone }) =>{
    // const [appIsInstantiated, setAppIsInstantiated] = useState(false); // to track if app was newly installed
    // const [stage, setStage] = useState(0); // 0 for onboard, 1 for login, 2 for signup

    // if (stage === 1) return <Login onSwitch={()=>setStage(2)} onAuthenticated={()=>isDone()}/>;

    // if (stage === 2) return <CreateAccount onSwitch={()=>setStage(1)}/>;

    // return <Onboarding onSwitch={()=> setStage(1)}/>;

    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen 
                name="AuthOnboarding" 
                component={Onboarding} 
                // options = {{headerShown: false}}
            />
            <AuthStack.Screen 
                name="SignIn" 
                component={Login} 
                // options = {{headerShown: false}}
            />
            <AuthStack.Screen 
                name="SignUp" 
                component={CreateAccount} 
                // options = {{headerShown: false}}
            />
            <AuthStack.Screen 
                name="CreateProfile" 
                component={CreateProfile} 
                // options = {{headerShown: false}}
            />
        </AuthStack.Navigator>
    )
}


export default AuthenticationStack;