import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Form from '../../components/form';
import { profileInfoSchema } from '../../constants/dummy';
import Onboarding from './Onboarding';


// This components is for the quick profile information
// on app initialization, not part of app's main screen
// all profile screens are handled in index.js in feature's folder

const CreateProfile = ({onDone}) =>{
    const [stage, setStage] = useState(0); // -1 for onboard, 1 for success, 0 for main content

    if (stage === -1) return <Onboarding switchContent={()=> setStage(0)} />; // -1
    if (stage === 1) return <SuccessScreen onCompleted={onDone}/> // 1

    return <ProfileFormScreen onSwitch={()=> setStage(1)}/> // 0
}

export default CreateProfile;


const SuccessScreen = ({ onCompleted }) =>{
    return (
        <View flex>
            {/* Top view with wave and title */}
            <View flex-2 center>
                <Image assetName="illu" assetGroup="assets" width={250} height={250}/>
            </View>

            {/* Success content */}
            <View flex-1 centerH>
                <Text h3>Profile update successful</Text>

                <Text p marginV-30 style={{width:"70%", textAlign:'center', }}>
                    Your application information has been updated successfully!. You can now go ahead to apply for internship roles
                </Text>

                <Button text="Continue" onPress={()=>onCompleted()}/>
            </View>

            

        </View>
    )
}

const ProfileFormScreen = ({onSwitch}) =>{
    return (
        <SafeAreaView style={{flex: 1, paddingTop: 20}}>
            <ScrollView contentContainerStyle={styles.formContainer} >
                {/* Top view with wave and title */}
                <View style={styles.top} >
                    <Text h3>Profile Information</Text>
                </View>

                {/* Auth form */}
                <View style={styles.container}>
                    <Form
                        onSubmit={()=>onSwitch()} 
                        schema={profileInfoSchema} 
                        authLabel={"Finish"}
                    />
                </View>

                

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  top: {
    paddingVertical: 20,
    alignItems:'center',
    justifyContent:'center'
  },


  formContainer:{
    // flex:1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
//   successContainer:{
//     flex:1,
//     // paddingBottom: 20,
//     // paddingHorizontal: 20,
//   },

  container:{
    paddingVertical: 30,
  },
  
});
