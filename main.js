import React, { useState } from 'react';
import Authentication from './features/authentication';
import CreateProfile from './features/Profile/CreateProfile';
import Home from './features/Home';

// This file determines where the app will start from

const InterncityApp = ()=>{
    const [isUserProfileSet, setIsUserProfileSet] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) return <Authentication isDone={()=>setIsAuthenticated(true)}/>
    if (!isUserProfileSet) return <CreateProfile isDone={()=>console.log("Done!")}/>

    return <Home/>

}

export default InterncityApp;