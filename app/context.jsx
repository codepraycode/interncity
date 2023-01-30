import React, { createContext, useEffect, useReducer } from 'react';
import { 
  collection,
  getDocs,
} from 'firebase/firestore';
import { collectionNames, database } from './firebaseConfig';

const AppContext = createContext();

export default AppContext;

export const AppContextProvider = ({children})=>{

    const initialState = {
        userAccount: {
            name:"Smaple name",
            token:{
                access:"dfakslkjflask"
            }
        },
        userProfile: null,
        schools: [],
        departments:[],
        sectors:[],
    }

    const ActionTypes = {
        UPDATE_ACCOUNT_PROFILE:"UPDATE_ACCOUNT_PROFILE",
        UPDATE_ACCOUNT:"UPDATE_ACCOUNT",
        UPDATE_SCHOOLS:"UPDATE_SCHOOLS",
        UPDATE_DEPARTMENTS:"UPDATE_DEPARTMENTS",
        UPDATE_SECTORS:"UPDATE_SECTORS",
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
            default:
                return {...prev}
        }
    }
    
    const [contextData, dispatch] = useReducer(reducers, initialState);

    const loadSchools = async ()=>{
        if (Array.isArray(contextData.schools) && contextData.schools.length > 1) return

        const schoolsCollectionRef = collection(database,collectionNames.SCHOOLS);
        let snapshot;
        try{
            snapshot = await getDocs(schoolsCollectionRef);
        }
        catch(err){
            console.log("Error fetching all schools", err);
        }

        let schools = snapshot.docs.map((item)=>({...item.data(), id: item.id}));
        dispatch({ type: ActionTypes.UPDATE_SCHOOLS, payload: schools });
    }

    const loadDepartments = async ()=>{
        if (Array.isArray(contextData.departments) && contextData.departments.length > 1) return

        const depratmentsCollectionRef = collection(database,collectionNames.DEPARTMENTS);
        let snapshot;
        try{
            snapshot = await getDocs(depratmentsCollectionRef);
        }
        catch(err){
            console.log("Error fetching all departments", err);
        }

        const departments = snapshot.docs.map((item)=>({...item.data(), id: item.id}));

        dispatch({ type: ActionTypes.UPDATE_DEPARTMENTS, payload: departments });
    }
    
    useEffect(() => {

        const bootstrapAsync = async () => {
            // Load all schools
            loadSchools()

            loadDepartments();

        };
        
        bootstrapAsync();
    }, [contextData.schools, contextData.departments, contextData.sectors]);

    const appContextData = React.useMemo(() => ({
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