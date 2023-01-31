import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export const collectionNames = {
     USER_ACCOUNT:"userAccounts",
     USER_PROFILE:"userProfiles",
     SCHOOLS:"schools",
     DEPARTMENTS:"departments",
     SECTORS:"sectors",
     JOBS:"jobs",
}