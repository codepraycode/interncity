import React, { createContext, useContext, useState, useMemo } from "react";
import Toast from 'react-native-root-toast';

import User from "../utils/models";
import { auth } from "../config/firebase";
import { userTypes } from "../config/constants";
import useNotifications from "../hooks/useNotification";
import { useRouter, useSegments } from "expo-router";
import { screenNames } from "../config/screens";

const AppContext = createContext(null);


// Toast function to display small popup messages.
function showToast(message='A toast message') {

    Toast.show(message, {
        duration: Toast.durations.SHORT, // .LONG
    })
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
    const segments = useSegments();
    const router = useRouter();

    React.useEffect(() => {
        // check if the link is of authentication.
        const inAuthGroup = segments[0] === "(auth)";

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !user &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace(screenNames.signIn);
        } else if (user && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace(screenNames.home);
        }
    }, [user, segments]);
}


// This hook will ensure that a user has a profile after authentication.
function useProfileProtectedRoute(user, aProfile) {
    const router = useRouter();

    React.useEffect(() => {
        // check if the link is of authentication.
        // const inAuthGroup = segments[0] === "(auth)";

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !(aProfile?.id) && Boolean(user)
        ) {
            // Redirect to the sign-in page.
            router.replace(screenNames.profile);
        }
    }, [user, aProfile]);
}

// Context component wrapper
export const AppContextProvider = ({ children }) =>{

    const [authUser, setAuthUser] = useState(null);
    const [expoPushToken, setExpoPushToken] = useState('');
    // Notification
    const { notification, updateNotification, newNotification } = useNotifications(expoPushToken);

    const profile = useMemo(async ()=>{
        if (authUser === null) return null;

        let data = await User.getProfile(auth);

        return data;
    }, [authUser]);

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

    useProtectedRoute(authUser);
    useProfileProtectedRoute(authUser, profile);


    // Set user type bool
    const isOrganization = profile?.type === userTypes.ORGANIZATION;
    const isSupervisor = profile?.type === userTypes.SUPERVISOR;
    const isIntern = profile?.type === userTypes.STUDENTS;

    const contextData = {
        profile,

        // Booleans
        isLoggedIn: Boolean(authUser?.token),
        isProfileComplete: profile?.meta?.isComplete,
        isOrganization,
        isSupervisor,
        isIntern,

        // Functions
        showToast: (msg)=>showToast(msg),
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

// context hook to consume.
const useAppContext = () => useContext(AppContext);
export default useAppContext;


