import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { 
  collection,
  getDocs,
  onSnapshot,
  query, where,
} from 'firebase/firestore';
import { auth, collectionNames, database } from './firebaseConfig';
import { JSONLog, userTypes } from './utils';
// import useSnapshot from "firebase-usesnapshot";
import useSnapshot from '../hooks/useSnapshot';


const AppContext = createContext();

export default AppContext;

const usersProfileCollectionRef = collection(database,collectionNames.USER_PROFILE);
const jobsCollectionRef = collection(database, collectionNames.JOBS);
const schoolsCollectionRef = collection(database,collectionNames.SCHOOLS);
const organizationQueryRef = query(usersProfileCollectionRef, where("type", "==", userTypes.ORGANIZATION));
const depratmentsCollectionRef = collection(database,collectionNames.DEPARTMENTS);
const sectorsCollectionRef = collection(database,collectionNames.SECTORS);


export const AppContextProvider = ({children})=>{

    const initialState = {
        userAccount: null,
        // {
        //     name:"Smaple name",
        //     token:{
        //         access:"dfakslkjflask"
        //     }
        // },
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
        UPDATE_SCHOOLS:"UPDATE_SCHOOLS",
        UPDATE_DEPARTMENTS:"UPDATE_DEPARTMENTS",
        UPDATE_SECTORS:"UPDATE_SECTORS",
        UPDATE_JOBS:"UPDATE_JOBS",
        UPDATE_ORGANIZATIONS:"UPDATE_ORGANIZATIONS",
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
            case ActionTypes.UPDATE_SCHOOLS:
                return {
                    ...prev,
                    schools: action.payload
                };
            case ActionTypes.UPDATE_DEPARTMENTS:
                return {
                    ...prev,
                    departments: action.payload
                };
            case ActionTypes.UPDATE_SECTORS:
                return {
                    ...prev,
                    sectors: action.payload
                };
            case ActionTypes.UPDATE_JOBS:
                return {
                    ...prev,
                    jobs: action.payload
                };
            case ActionTypes.UPDATE_ORGANIZATIONS:
                return {
                    ...prev,
                    organizations: action.payload
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
    
    const jobsPayload = useSnapshot(jobsCollectionRef);
    const schoolsPayload = useSnapshot(schoolsCollectionRef);
    const organizationsPayload = useSnapshot(organizationQueryRef);
    const departmentsPayload = useSnapshot(depratmentsCollectionRef);
    const sectorsPayload = useSnapshot(sectorsCollectionRef);

    const isOrganization = contextData.userProfile?.type === 'organization';
    const isSupervisor = contextData.userProfile?.type === 'supervisor'
    const isIntern = contextData.userProfile?.type === 'intern';


    const appContextData = ({
        ...contextData,
        jobs: jobsPayload,
        schools: schoolsPayload,
        organizations:organizationsPayload,
        departments:departmentsPayload,
        sectors: sectorsPayload,

        isOrganization,
        isSupervisor,
        isIntern,

        isLoggedIn: Boolean(contextData.userAccount?.token),
        isProfileComplete: Boolean(contextData.userProfile) && Boolean(contextData.userProfile.type) && Boolean(contextData.userProfile.isComplete),
        
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        updateAccountProfile: (data) => {
            console.log("UPDATE Account Profile");

            dispatch({ type: ActionTypes.UPDATE_ACCOUNT_PROFILE, payload: data });
        },
        updateAccount: (data) => {
            console.log("UPDATE Account");

            dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: data});
        },

    })

    useMemo(()=>{
        auth.onAuthStateChanged((user)=>{

            if (!user){
                // CLear state
                console.log("clear state");
                dispatch({ type: ActionTypes.RESET_STATE});
                return
            }

            console.log("AUthenticatedddsds!");

            const {providerData, stsTokenManager} = user;
            
            const userD = providerData[0] || {}
            const userData = {
              ...userD,
              token: stsTokenManager
            };
            
            dispatch({ type: ActionTypes.UPDATE_ACCOUNT, payload: userData});
            // bootstrapAsync();

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
