import React, { useState } from 'react';
import { Text, View } from 'react-native-ui-lib';
import Onboarding from './Onboarding';


// This components is for the quick profile information
// on app initialization, not part of app's main screen
// all profile screens are handled in index.js in feature's folder

const CreateProfile = () =>{
    const [stage, setStage] = useState(0); // 0 for onboard,

    if (stage === 0) <Onboarding onSwitch={()=> setStage(1)}/>;

    return (
        <View flex center>
            <Text h2>Continuation</Text>
        </View>
    )
}

export default CreateProfile;