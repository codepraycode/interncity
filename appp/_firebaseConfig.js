import { initializeApp } from 'firebase/app';
import { collection, getFirestore, query, where } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { userTypes } from './utils';

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

export const app = initializeApp(configurations);
export const database = getFirestore(app);
// initialize auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const storageRef = getStorage();
export const imageStorageRef = getStorage(app, 'photos');


export const collectionNames = {
     USER_ACCOUNT:"userAccounts",
     USER_PROFILE:"userProfiles",
     SCHOOLS:"schools",
     DEPARTMENTS:"departments",
     SECTORS:"sectors",
     JOBS:"jobs",
     APPLICATIONS:"internAccount",
     LOGS:"internLogs",
}


const usersProfileCollectionRef = collection(database,collectionNames.USER_PROFILE);
export const applicationsCollectionRef = collection(database,collectionNames.APPLICATIONS);

export const jobsCollectionRef = collection(database, collectionNames.JOBS);
export const schoolsCollectionRef = collection(database,collectionNames.SCHOOLS);
export const organizationQueryRef = query(usersProfileCollectionRef, where("type", "==", userTypes.ORGANIZATION));
export const studentsQueryRef = query(usersProfileCollectionRef, where("type", "==", userTypes.STUDENTS));
export const getApplicationsQueryRef = (organizationId) => query(applicationsCollectionRef); //, where("organization", "==", organizationId));
export const depratmentsCollectionRef = collection(database,collectionNames.DEPARTMENTS);
export const sectorsCollectionRef = collection(database,collectionNames.SECTORS);
export const logsCollectionRef = collection(database,collectionNames.LOGS);
