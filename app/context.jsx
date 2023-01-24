import React, { createContext, useEffect, useReducer, useState } from 'react';
import SecureStore from 'expo-secure-store';

const AppContext = createContext();

export default AppContext;

export const AppContextProvider = ({children})=>{

    const initialState = {
        isLoading: true,
        isSignout: false,
        userToken: null,
        userAccount: null,
        userProfile: null,
        userAllset: false,
        userType:"organization"
    }

    const reducers = (prev, action) =>{
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prev,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'SIGN_IN':
                return {
                    ...prev,
                    isSignout: false,
                    userToken: action.token,
                };
            case 'SIGN_UP':
                return {
                    ...prev,
                    isSignout: false,
                    userAccount: action.payload,
                    userProfile: null,
                    userToken: null,
                };
            case 'SIGN_OUT':
                return {
                    ...prev,
                    isSignout: true,
                    userToken: null,
                };
            case 'UPDATE_PROFILE':
                return {
                    ...prev,
                    userProfile:{
                        ...action.payload
                    }
                };
        }
    }

    // const [contextData, setContextData] = useState('dfdsd');
    const [contextData, dispatch] = useReducer(reducers, initialState);
    
    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        
        const bootstrapAsync = async () => {
            let userToken;
            
            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        
        bootstrapAsync();
    }, []);

    const appContextData = React.useMemo(() => ({
        ...contextData,
        signIn: async (data) => {
            console.log("SIGN IN",data);
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async (data) => {
            console.log("SIGN UP",data);
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token

            dispatch({ type: 'SIGN_UP', payload: {email:'sample@mail.com', password:'letmein'}});
        },
        updateProfile: async (data) => {
            console.log("UPDATE PROFILE",data);
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token

            dispatch({ type: 'UPDATE_PROFILE', payload: {name:'BulaBlu Blu', ...data} });
        },

    }), [contextData.isSignout, contextData.userToken, contextData.userProfile]);


    return (
        <AppContext.Provider value={appContextData}>
            <AppContext.Consumer>
                {
                    ()=>(
                        <>
                            {children}
                        </>
                    )
                }
            </AppContext.Consumer>
        </AppContext.Provider>
    )
}


export const AppContextSubscriber = ({children})=>{

    return (
        <>
            <AppContext.Consumer>
                {(context)=>{

                    // console.log(context);

                    return (
                    <>
                        {children}
                    </>
                )}}
            </AppContext.Consumer>
        </>
    )
}