import React, { createContext, useMemo, useReducer, useState } from 'react';
import Toast from 'react-native-root-toast';

import { 
    auth, 
    jobsCollectionRef,
    schoolsCollectionRef,
    organizationQueryRef,
    depratmentsCollectionRef,
    sectorsCollectionRef,
    getApplicationsQueryRef,
    logsCollectionRef
} from './firebaseConfig';

import { JSONLog } from './utils';
import { useSnapshot, useNotifyingSnapshot} from '../hooks/useSnapshot';
import useNotifications from '../hooks/useNotification';

const AppContext = createContext();

export default AppContext;



export const AppContextProvider = ({children})=>{    

    const initialState = {
        userAccount: null,
        userProfile: null,
        schools: [],
        departments:[],
        sectors:[],
        jobs:[],
        organizations:[],
    }

    const ActionTypes = {
        UPDATE_ACCOUNT_PROFILE:"UPDATE_ACCOUNT_PROFILE",
        UPDATE_ACCOUNT:"UPDATE_ACCOUNT",
        UPDATE_DBS:"UPDATE_DBS",
        RESET_STATE:"RESET_STATE",
    }

    const reducers = (prev, action) =>{
        switch (action.type) {
            case ActionTypes.UPDATE_ACCOUNT_PROFILE:
                return {
                    ...prev,
                    userProfile:{
                        ...prev.userProfile,
                        ...action.payload
                    }
                };
            case ActionTypes.UPDATE_ACCOUNT:
                return {
                    ...prev,
                    userAccount:{
                        ...prev.userAccount,
                        ...action.payload
                    }
                };
            case ActionTypes.UPDATE_DBS:
                return {
                    ...prev,
                    ...action.payload
                };
            case ActionTypes.RESET_STATE:
                return {
                    ...prev,
                    ...initialState
                };
            default:
                return {...prev}
        }
    }

    const [contextData, dispatch] = useReducer(reducers, initialState);
    const applicationsQuery = getApplicationsQueryRef(contextData.userProfile?.id || '');
    
    const [expoPushToken, setExpoPushToken] = useState('');
    const {notification,updateNotification, newNotification} = useNotifications(expoPushToken);

    const isOrganization = contextData.userProfile?.type === 'organization';
    const isSupervisor = contextData.userProfile?.type === 'supervisor'
    const isIntern = contextData.userProfile?.type === 'student';

    const jobsPayload = useNotifyingSnapshot(jobsCollectionRef, ()=>{
        if (isSupervisor) return;
        
        console.log("Notifying!");
        newNotification({
            title: "New job is available",
            body: "A new job from an organization is available for your to apply"
            // data
        });
        
    });

    
    
    const applicationsPayload = useSnapshot(applicationsQuery);
    const schoolsPayload = useSnapshot(schoolsCollectionRef);
    const organizationsPayload = useSnapshot(organizationQueryRef);
    const departmentsPayload = useSnapshot(depratmentsCollectionRef);
    const sectorsPayload = useSnapshot(sectorsCollectionRef);
    const logsPayload = useSnapshot(logsCollectionRef);

    function showToast(message) {

        Toast.show(message, {
            duration: Toast.durations.SHORT, // .LONG
        })
    }
    const appContextData = ({
        ...contextData,
        jobs: jobsPayload,
        schools: schoolsPayload,
        organizations:organizationsPayload,
        departments:departmentsPayload,
        sectors: sectorsPayload,
        applications:applicationsPayload,
        logs:logsPayload,

        isOrganization,
        isSupervisor,
        isIntern,

        isLoggedIn: Boolean(contextData.userAccount?.token),
        isProfileComplete: Boolean(contextData.userProfile) && Boolean(contextData.userProfile.type) && Boolean(contextData.userProfile.isComplete),

        expoPushToken,
        notification,

        showToast,

        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        updateAccountProfile: (data) => {
            console.log("UPDATE Account Profile");

            dispatch({ type: ActionTypes.UPDATE_ACCOUNT_PROFILE, payload: data });
        },
        updateAccount: (data) => {
            console.log("UPDATE Account");

            dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: data});
        },

        updateExpoPushToken: (token)=> setExpoPushToken(token),
        updateNotification,

    });

    useMemo(()=>{
        auth.onAuthStateChanged((user)=>{

            if (!user){
                showToast("User logged out");
                // CLear state
                console.log("clear state");
                dispatch({ type: ActionTypes.RESET_STATE});
                return
            }

            showToast("User authenticated!");

            const {providerData, stsTokenManager, uid} = user;
            
            const userD = providerData[0] || {}
            const userData = {
                id: uid,
              ...userD,
              token: stsTokenManager
            };
            
            dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: userData});
        })
    },[]);



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
