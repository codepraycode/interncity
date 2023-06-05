import { createContext, useContext, useState, useMemo } from "react";
import Toast from 'react-native-root-toast';

import User from "../utils/models";
import { auth } from "../config/firebase";
import { userTypes } from "../config/constants";
import useNotifications from "../hooks/useNotification";

const AppContext = createContext();


// Toast
function showToast(message='A toast message') {

    Toast.show(message, {
        duration: Toast.durations.SHORT, // .LONG
    })
}

// Instantiate authenticating user;

export const AppContextProvider = ({ children }) =>{

    const [authUser, setAuthUser] = useState(null);

    // Notification
    const [expoPushToken, setExpoPushToken] = useState('');
    const { notification, updateNotification, newNotification } = useNotifications(expoPushToken);

    const profile = useMemo(()=>{
        if (authUser === null) return null;

        let data;
        try{
            data = User.getProfile(auth);
        } catch (err) {
            showToast(err);
            return {
                meta : {
                    isComplete: false
                }
            }
        }

        return data;
    }, [authUser]);

    // Set user type bool
    const isOrganization = profile?.type === userTypes.ORGANIZATION;
    const isSupervisor = profile?.type === userTypes.SUPERVISOR;
    const isIntern = profile?.type === userTypes.STUDENTS;

    useMemo(() => {
        auth.onAuthStateChanged((user) => {

            if (!user) {
                showToast("Not authenticated");
                // CLear state
                // console.log("clear state");
                // dispatch({ type: ActionTypes.RESET_STATE });
                setAuthUser(null);
                return
            }

            showToast("Authenticated!");

            const { providerData, stsTokenManager, uid } = user;

            const userD = providerData[0] || {}
            const userData = {
                id: uid,
                ...userD,
                token: stsTokenManager
            };

            setAuthUser(()=>userData)

            // dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: userData });
        })
    }, []);

    const contextData = {
        profile,

        // Booleans
        isLoggedIn: Boolean(authUser?.token),
        isProfileComplete: profile?.meta?.isComplete,
        isOrganization,
        isSupervisor,
        isIntern,

        // Functions
        showToast,
        updateExpoPushToken: (token) => setExpoPushToken(token),
        updateNotification
    }

    return (
        <AppContext.Provider value={contextData}>
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


const useAppContext = () => useContext(AppContext);
export default useAppContext;


