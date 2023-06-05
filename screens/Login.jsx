import React, { useState } from 'react';
import {Text } from 'react-native-ui-lib';
import { TouchableOpacity} from 'react-native';

import { signInWithEmailAndPassword } from "firebase/auth";
import {HandleFirebaseError} from '../app/utils';
import { auth } from '../config/firebase';
import { loginFormSchema } from '../config/forms';
import {ThemeColors as Theme} from '../resources/theme';
import AuthScreenLayout from '../components/Layout/AuthLayout';
import { screenNames } from '../config/screens';
import SSO from '../components/SSO';
import Form, { AuthenticationForm } from '../components/Form';

/* 
    Login screen
*/

const LoginScreen = ({ navigation })=>{

    const formSchema = loginFormSchema //UserAccount.getAuthSchema();

    // const handleLogin = (loginData)=>{
      
    //   if (loading) return;

    //   const {email, password} = loginData;

    //   setLoading(true)
    //   setFormErrors(()=>({}));

    //   UserAccount.validateAuthData({email, password})
    //   .then( async (value)=>{
        
    //         let userCredential;
    //         try{
    //           userCredential = await signInWithEmailAndPassword(auth,value.email, value.password);
    //         }
    //         catch(error){
    //           const err = HandleFirebaseError(error);
    //           setFormErrors(()=>err);
    //           setLoading(false)
    //           return // end it
    //         }

    //         setLoading(false);
          
    //   })
    //   .catch(err=>{          
    //       setFormErrors(()=>err);
    //       setLoading(false)
    //   })
    // }

    return (


        <AuthScreenLayout
          headerText={"Welcome back"}
        >
            <AuthenticationForm
              schema={formSchema}
              remember={false}
              forgotPassword={true}

              loadingLabel={"Logging In..."}

              handleNavigate={()=>navigation.navigate(screenNames.createAccount)}
              login
            />

        </AuthScreenLayout>
    )
}

export default LoginScreen;
