import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { profileInfoSchema } from '../../constants/dummy';
import Onboarding from './Onboarding';


// This components is for the quick profile information
// on app initialization, not part of app's main screen
// all profile screens are handled in index.js in feature's folder

const CreateProfile = () =>{
    const [stage, setStage] = useState(0); // 0 for onboard,

    if (stage === 0) return <Onboarding onSwitch={()=> setStage(1)}/>;

    return (
        <ScrollView contentContainerStyle={styles.formContainer} >
            {/* Top view with wave and title */}
            <View style={styles.top} >
                <Text h2>Profile Information</Text>
            </View>

            {/* Auth form */}
            <View style={styles.container}>
                <Form 
                    onSubmit={()=>console.log("Submitted")} 
                    schema={profileInfoSchema} 
                    authLabel={"Finish"}
                />
            </View>

            

        </ScrollView>
    )
}

export default CreateProfile;

const styles = StyleSheet.create({
  top: {
    paddingVertical: 10,
    alignItems:'center',
    justifyContent:'center'
  },


  formContainer:{
    // flex:1,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },

  container:{
    paddingVertical: 30,
  },
  
});
