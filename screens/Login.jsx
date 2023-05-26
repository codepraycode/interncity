import React, { useState } from 'react';
import {Text } from 'react-native-ui-lib';
import { TouchableOpacity} from 'react-native';
import Form from '../components/form';

import { signInWithEmailAndPassword } from "firebase/auth";
import {HandleFirebaseError} from '../app/utils';
import { auth } from '../config/firebase';
import { loginFormSchema } from '../config/forms';
import Theme from '../constants/theme';
import AuthScreenLayout from '../components/Layout/AuthLayout';
import { screenNames } from '../config/screens';
import SSO from '../components/SSO';

/* 
    Login screen
*/

const LoginScreen = ({ navigation })=>{

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const formSchema = loginFormSchema //UserAccount.getAuthSchema();

    const handleLogin = (loginData)=>{
      
      if (loading) return;

      const {email, password} = loginData;

      setLoading(true)
      setFormErrors(()=>({}));

      UserAccount.validateAuthData({email, password})
      .then( async (value)=>{
        
            let userCredential;
            try{
              userCredential = await signInWithEmailAndPassword(auth,value.email, value.password);
            }
            catch(error){
              const err = HandleFirebaseError(error);
              setFormErrors(()=>err);
              setLoading(false)
              return // end it
            }

            setLoading(false);
          
      })
      .catch(err=>{          
          setFormErrors(()=>err);
          setLoading(false)
      })
    }

    return (


        <AuthScreenLayout
          headerText={"Welcome back"}
        >
            <Form 
              onSubmit={(data)=> handleLogin(data)}
              schema={formSchema} 
              authLabel={loading ? "Logging In..." :"Login" }
              remember={false} 
              forgotPassword={false}
              errors={formErrors}
              disable={loading}
            />

            <SSO 
              google={"Sign in with Google"}
            />


            <TouchableOpacity
              onPress={() => !loading && navigation.navigate(screenNames.createAccount)}
              activeOpacity={0.6}
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{ marginTop: 20, color: Theme.accent }}
              >
                <Text>You don't have an account yet?</Text> <Text secondary a>Sign Up</Text>
              </Text>
            </TouchableOpacity>

        </AuthScreenLayout>
    )
}

export default LoginScreen;
