import React, { createContext, useEffect, useReducer, useState } from 'react';
import { 
  collection,
  getDocs,
  query, where,
} from 'firebase/firestore';
import { auth, collectionNames, database } from './firebaseConfig';
import { JSONLog, userTypes } from './utils';


const AppContext = createContext();

export default AppContext;

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
    const [loading, setLoading] = useState(false);

    const loadJobs = async (organizationId=null)=>{
        // If organization id is null, load all jobs then
        
        const jobsCollectionRef = collection(database,collectionNames.JOBS);
        let jobs = [];

        try{
            const snapshot = await getDocs(jobsCollectionRef);
            jobs = snapshot.docs.map((item)=>({...item.data(), id: item.id}));
            console.log("fetched jobs:", jobs);
            dispatch({ type: ActionTypes.UPDATE_JOBS, payload: jobs });
        }
        catch(err){
            console.log("Error fetching jobs", err);
        }
    }

    const loadSchools = async ()=>{
        if (Array.isArray(contextData.schools) && contextData.schools.length > 1) return;

        const schoolsCollectionRef = collection(database,collectionNames.SCHOOLS);
        let schools = [];

        try{
            const snapshot = await getDocs(schoolsCollectionRef);
            schools = snapshot.docs.map((item)=>({...item.data(), id: item.id}));
            // dispatch({ type: ActionTypes.UPDATE_SCHOOLS, payload: schools });
            return {
                schools
            };
        }
        catch(err){
            console.log("Error fetching all schools", err);
        }

    }    

    const loadOrganizations = async ()=>{
        // load all organizations
        if (Array.isArray(contextData.organizations) && contextData.organizations.length > 1) return;

        const usersProfileCollectionRef = collection(database,collectionNames.USER_PROFILE);
        const q = query(usersProfileCollectionRef, where("type", "==", userTypes.ORGANIZATION));

        let organizations;

        try{
            const snapshot = await getDocs(q);
            organizations = snapshot.docs.map((item)=>({...item.data(), id: item.id}));
            // dispatch({ type: ActionTypes.UPDATE_ORGANIZATIONS, payload: organizations });
            return {organizations};
        }
        catch(err){
            console.log("Error fetching organizations", err);
        }

    }

    const loadDepartments = async ()=>{
        if (Array.isArray(contextData.departments) && contextData.departments.length > 1) return

        const depratmentsCollectionRef = collection(database,collectionNames.DEPARTMENTS);
        let departments;
        try{
            const snapshot = await getDocs(depratmentsCollectionRef);
            departments = snapshot.docs.map((item)=>({...item.data(), id: item.id}));
            // dispatch({ type: ActionTypes.UPDATE_DEPARTMENTS, payload: departments });
            return {departments};
        }
        catch(err){
            console.log("Error fetching all departments", err);
        }

    }

    const loadSectors = async ()=>{
        if (Array.isArray(contextData.sectors) && contextData.sectors.length > 1) return

        const depratmentsCollectionRef = collection(database,collectionNames.SECTORS);
        let sectors;

        try{
            const snapshot = await getDocs(depratmentsCollectionRef);
            sectors = snapshot.docs.map((item)=>({...item.data(), id: item.id}));
            // dispatch({ type: ActionTypes.UPDATE_SECTORS, payload: sectors });
            return {sectors};
        }
        catch(err){
            console.log("Error fetching all sectors", err);
        }
    }
    
    const bootstrapAsync = async () => {
        if (loading) return;

        setLoading(true);

        

        Promise.all([
            loadSchools(),
            loadDepartments(),
            loadSectors(),
            loadOrganizations(),
        ]).then((dt)=>{
            // JSONLog(dt);
            console.log("Loaded state");
            
            let loadedStateData = {}
            dt.forEach((each)=>{
                if (!each) return
                loadedStateData = {...loadedStateData, ...each}
            })


            if (Object.keys(loadedStateData).length >= 1){
                // JSONLog(loadedStateData);

                dispatch({
                    type: ActionTypes.UPDATE_DBS,
                    payload: loadedStateData
                });
            }

            if (loading) setLoading(false);
        })
        .catch((err)=>{
            console.log("error loading context:", err);
            if (loading) setLoading(false);
        })

    };  

    useEffect(()=>{
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
            bootstrapAsync();

        })
    }, [])
    // console.log("asdfsd");
    // JSONLog(contextData)
    // console.log("userrr:", user);
    
    const appContextData = ({
        ...contextData,
        isOrganization:contextData.userProfile?.type === 'organization',
        isSupervisor:contextData.userProfile?.type === 'supervisor',
        isIntern:contextData.userProfile?.type === 'intern',

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
        loadJobs,

    })

    // JSONLog(appContextData)

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
