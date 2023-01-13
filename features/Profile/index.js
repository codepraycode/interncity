import React, { useState } from 'react';
import Onboarding from './Onboarding';


const ProfileInfo = () =>{
    // const [appIsInstantiated, setAppIsInstantiated] = useState(false); // to track if app was newly installed
    const [stage, setStage] = useState(0); // 0 for onboard, 1 for login, 2 for signup

    // if (stage === 1) return <Login onSwitch={()=>setStage(2)}/>;

    // if (stage === 2) return <CreateAccount onSwitch={()=>setStage(1)}/>;

    return <Onboarding onSwitch={()=> setStage(1)}/>;
}


export default ProfileInfo;