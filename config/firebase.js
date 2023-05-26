import { getApp, getApps, initializeApp } from 'firebase/app';
import { collection, getFirestore, query, where } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import {
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userTypes } from './constants';
import { getAuth } from 'firebase/auth';

// Store in env for production
const configurations = {
    apiKey: "AIzaSyDuKXnxjWA2h3_EfT-ouH3UxdIaMcPcOks",
    authDomain: "interncity-project.firebaseapp.com",
    projectId: "interncity-project",
    storageBucket: "interncity-project.appspot.com",
    messagingSenderId: "430888339747",
    appId: "1:430888339747:web:190f80ff5297b72cfae496",
    measurementId: "G-B5WW68PVVT"
};

let app, auth;

if (!getApps().length) {
    try {
        app = initializeApp(configurations);
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
        });
    } catch (error) {
        console.log("Error initializing app: " + error);
    }
} else {
    app = getApp();
    auth = getAuth(app);
}

export {
    app, auth
}

// Database
export const database = getFirestore(app);

export const storageRef = getStorage();
export const imageStorageRef = getStorage(app, 'photos');


export const collectionNames = {
    USER_ACCOUNT: "userAccounts",
    USER_PROFILE: "Profiles",
    SCHOOLS: "Schools",
    DEPARTMENTS: "Departments",
    SECTORS: "Sectors",
    JOBS: "Jobs",
    APPLICATIONS: "InternAccounts",
    LOGS: "InternLogs",
}


export const ProfilesCollectionRef = collection(database, collectionNames.USER_PROFILE);
export const applicationsCollectionRef = collection(database, collectionNames.APPLICATIONS);
export const jobsCollectionRef = collection(database, collectionNames.JOBS);
export const schoolsCollectionRef = collection(database, collectionNames.SCHOOLS);
export const depratmentsCollectionRef = collection(database, collectionNames.DEPARTMENTS);
export const sectorsCollectionRef = collection(database, collectionNames.SECTORS);
export const logsCollectionRef = collection(database, collectionNames.LOGS);


// Query
export const organizationQueryRef = query(ProfilesCollectionRef, where("type", "==", userTypes.ORGANIZATION));
// export const studentsQueryRef = query(ProfilesCollectionRef, where("type", "==", userTypes.STUDENTS));
export const getApplicationsQueryRef = (organizationId) => query(applicationsCollectionRef);
