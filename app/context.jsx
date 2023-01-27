import React, { createContext, useEffect, useReducer } from 'react';
import SecureStore from 'expo-secure-store';

const AppContext = createContext();

export default AppContext;

export const AppContextProvider = ({children})=>{

    const initialState = {
        userAccount: null,
        userProfile: null,
        userType:'supervisor'//"organization"
    }

    const ActionTypes = {
        UPDATE_ACCOUNT_PROFILE:"UPDATE_ACCOUNT_PROFILE",
        UPDATE_ACCOUNT:"UPDATE_ACCOUNT",
    }

    const reducers = (prev, action) =>{
        switch (action.type) {
            case ActionTypes.UPDATE_ACCOUNT_PROFILE:
                return {
                    ...prev,
                    userProfile:{
                        ...action.payload
                    }
                };
            case ActionTypes.UPDATE_ACCOUNT:
                return {
                    ...prev,
                    userAccount:{
                        ...action.payload
                    }
                };
            default:
                return {...prev}
        }
    }

    // const [contextData, setContextData] = useState('dfdsd');
    const [contextData, dispatch] = useReducer(reducers, initialState);
    
    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        
        const bootstrapAsync = async () => {
            // if (contextData.userAccount?.token) return;
            
            let userToken;
            
            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
                // console.log(e)
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        
        bootstrapAsync();
    }, []);

    const appContextData = React.useMemo(() => ({
        ...contextData,
        isOrganization:contextData.userType === 'organization',
        isSupervisor:contextData.userType === 'supervisor',
        isIntern:contextData.userType === 'intern',
        
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        updateAccountProfile: (data) => {
            console.log("UPDATE Account Profile");
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token

            dispatch({ type: ActionTypes.UPDATE_ACCOUNT_PROFILE, payload: data });
        },
        updateAccount: (data) => {
            console.log("UPDATE Account");
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token

            // Must include token

            dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: data});
        },

    }),[contextData.userProfile, contextData.userAccount]);

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

                    return (
                    <>
                        {children}
                    </>
                )}}
            </AppContext.Consumer>
        </>
    )
}