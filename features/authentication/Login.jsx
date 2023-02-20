import React, { useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';
import Form from '../../components/form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../app/firebaseConfig';
import {HandleFirebaseError, JSONLog} from '../../app/utils';
import UserAccount from '../../app/models/User';
import AuthLayout from '../../components/Layout';
import Theme from '../../constants/theme';

/* 
    Login screen
*/

const Login = ({ navigation })=>{
    const auth = getAuth(app);

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const formSchema = UserAccount.getAuthSchema();

    const handleLogin = (loginData)=>{
      
      if (loading) return;

      const {email, password} = loginData;

      setLoading(true)
      setFormErrors(()=>({}));

      UserAccount.validateAuthData({email, password})
      .then( async (value)=>{
        
            let userCredential;
            console.log("Val:", value)

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


        <AuthLayout>
            {/* Top view with wave and title */}
            <View style={styles.top} >
                <Image assetName="wave" assetGroup="assets" width={71} height={71}/>
                <Text h2>Welcome Back</Text>
            </View>

            {/* Auth form */}
            <View style={styles.container}>
                <Form 
                  onSubmit={(data)=> handleLogin(data)}
                  schema={formSchema} 
                  authLabel={loading ? "Loging In..." :"LOGIN" }
                  remember={false} 
                  forgotPassword={false}
                  sso = {false}
                  errors={formErrors}
                  disable={loading}
                />

                {
                  !loading && (
                    <TouchableOpacity 
                      onPress={()=>navigation.navigate("SignUp")}
                      style={{
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                    >
                      <Text 
                        style={{marginTop: 20, color: Theme.accent}}
                      >
                        <Text>You don't have an account yet?</Text> <Text secondary a>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                  )
                }
            </View>

        </AuthLayout>
    )
}

export default Login;


const styles = StyleSheet.create({
  top: {
    alignItems:'center',
    justifyContent:'flex-end'
  },


  container:{
    paddingVertical: 10,
  },
  
});
