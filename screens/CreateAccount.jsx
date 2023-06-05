import React, { useState } from 'react';
import { Text } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';
import Form from '../components/Form';
import Theme from '../constants/theme';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
// import UserAccount from '../app/models/User';
import { HandleFirebaseError } from '../app/utils';
import AuthScreenLayout from '../components/Layout/AuthLayout';
import { screenNames } from '../config/screens';
import SSO from '../components/SSO';
import { createAccountFormSchema } from '../config/forms';
/* 
    CreateAccount screen
*/


const CreateAccountScreen = ({ navigation })=>{
    
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const formSchema = createAccountFormSchema; // UserAccount.getCreateAccountSchema();

    const handleCreateAccount = (userData) =>{
      
      if (loading) return;

      // const demo = {
      //   email:"me@codepraycodde.com",
      //   password: "letmein123",
      //   confirmPassword: "letmein123",
      // }


      UserAccount.validateCreateAccountData(userData)
      .then( async (value)=>{

          let userCredential;

          try{
            userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password)
          }
          catch(error){
              const err = HandleFirebaseError(error);
              setFormErrors(()=>err);
              setLoading(false);

              return;
          }

          try{
            await UserAccount.intializeProfile(auth);
          }catch(err){
              setFormErrors(()=>err);
              setLoading(false);
              return;
          }

      })
      .catch(err=>{
          // console.log("Error", err);
          setFormErrors(()=>err);
          setLoading(false)
      });
      
      setLoading(true)
      setFormErrors(()=>({}));
    }

    return (

        <AuthScreenLayout
          headerText={"Create Account"}
        >
            <Form 
              onSubmit={(data)=> handleCreateAccount(data)}
              schema={formSchema} 
              authLabel={loading ? "Creating..." : "Create account" }
              errors={formErrors}
              disable={loading}
            />

            <SSO
              google={"Continue in with Google"}
            />

            <TouchableOpacity
              onPress={() => !loading && navigation.navigate(screenNames.login)}
              activeOpacity={0.6}
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{ marginTop: 20, color: Theme.accent }}
              >
                <Text>Already have an account?</Text> <Text secondary a>Sign In</Text>
              </Text>
            </TouchableOpacity>
        </AuthScreenLayout>  
    )
}

export default CreateAccountScreen;

