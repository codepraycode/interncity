import React, { useState } from 'react';
import Authentication from './features/authentication';
import CreateProfile from './features/Profile/CreateProfile';
import AppScreens from './features';

// This file determines where the app will start from

const InterncityApp = ()=>{
    const [isUserProfileSet, setIsUserProfileSet] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // if (!isAuthenticated) return <Authentication isDone={()=>setIsAuthenticated(true)}/>
    // if (!isUserProfileSet) return <CreateProfile onDone={()=>setIsUserProfileSet(true)}/>

    return <AppScreens/>

}

export default InterncityApp;