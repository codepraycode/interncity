import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import { View } from 'react-native-ui-lib';
import Form from '../../components/form';
import Theme from '../../constants/theme';
import UserAccount from '../../app/models/User.js'
import SafeAreaLayout from '../../components/Layout';
import { auth, imageStorageRef, storageRef } from '../../app/firebaseConfig';

import { JSONLog, setUpWithPreviousValue } from '../../app/utils';
import {HeaderTitle} from '../../components/AppHeader';
import { Preloader } from '../../components/Modal';
import useProfile from '../../hooks/useProfile';
import { ref, uploadBytes } from 'firebase/storage';
import AppContext from '../../app/context';

const ProfileFormScreen = ({navigation, route}) =>{
    
    const {profileType:selectedProfileType, title} = route.params;

    const {showToast} = useContext(AppContext);
      
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [userProfile, updateProfile] = useProfile();


    const uploadImage = async (avatar, email)=>{

      if (!avatar || !email) return null;

      const res = await fetch(avatar.uri);
      const blob = await res.blob();
      const filename = `${email}_${new Date().getTime()}`;
      const reff = ref(storageRef, `photos/${filename}`)

      await uploadBytes(reff, blob);
      
      return `gs://interncity-project.appspot.com/${reff.fullPath}`;
    }

    const handleCreateProfile = async (updatedData)=>{
      if (loading) return;
      
      setLoading(true);
      setFormErrors(()=>({}));

      const {avatar:rawUpload, email, ...rest} = updatedData;
      let avatar = null;

      try{
        avatar = await uploadImage(rawUpload, email);
      }
      catch(err){
        console.log("Error upload image:", err);
        setLoading(false);
        showToast("Could not update profile photo");
      }

      const combinedData = {
        type: profileType, // new type selected
        // ...updatedData // latest data update
        avatar,
        email,
        ...rest
      }

      const {isComplete, ...data} = combinedData;

      updateProfile(data)
      .then(()=>{
        navigation.navigate("ProfileSuccess");
        setLoading(false);
      })
      .catch((err)=>{
        // JSONLog("Error",err);
        setFormErrors(()=>err);
        setLoading(false)
      })

    }

    useEffect(()=>{

      if (Boolean(title)){
        navigation.setOptions({
          headerTitle: ()=><HeaderTitle title={title}/>,
        })
      }
      
    },[]);

    const profileType = userProfile?.type || selectedProfileType;

    let formSchema = UserAccount.getProfileSchema(profileType);
    const getPreviousValues = useCallback(()=>{
      // process the previous values

      let seedValue = {
        email: auth.currentUser.providerData[0].email
      }

      return setUpWithPreviousValue(formSchema, userProfile, seedValue);
    })


    return (
        <SafeAreaLayout scrollStyle={{marginTop:-35}} style={{paddingTop: 0}}>
            
            <Preloader show={loading} text="loading"/>

            {/* Auth form */}
            <View style={styles.container}>
                <Form
                    onSubmit={(data)=> handleCreateProfile(data)}
                    schema={formSchema} 
                    getPreviousValues={getPreviousValues}
                    authLabel={ !loading ? "Continue":"Loading..."}
                    errors={formErrors}
                    disable={loading}
                />
            </View>
        </SafeAreaLayout>
    )
}

const styles = StyleSheet.create({
  top: {
    paddingBottom: 10,
    margin:0,
  },

  container:{
    paddingVertical: 0,
    width: 400,
    maxWidth: "90%"
  },

  option:{
    backgroundColor:Theme.grey101,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
    borderColor:Theme.lightSecondary,
    borderWidth:1,
    elevation:3,
    width: 150,
    height: 150,
    marginTop:20,
  }
  
});


export default ProfileFormScreen;