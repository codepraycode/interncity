import React, { useContext, useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {authSchema} from '../../constants/dummy';
import Form from '../../components/form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../app/firebaseConfig';
import {HandleFirebaseError, JSONLog} from '../../app/utils';
import { UserAccount } from '../../app/models/User';
import AuthLayout from './AuthLayout';
import Theme from '../../constants/theme';
import AppContext from '../../app/context';

/* 
    Login screen
*/

const Login = ({ navigation })=>{
    const auth = getAuth(app);
    const {updateAccount} = useContext(AppContext);

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleLogin = (loginData)=>{
      
      if (loading) return;
      
      // const demo = {
      //   email:"me@ccodepraycode.com",
      //   password: "letmein123"
      // }
      const {email, password} = loginData;


      UserAccount.validateAuthData({email, password})
      .then((value)=>{
          signInWithEmailAndPassword(auth,value.email, value.password)
          .then((userCredential)=>{
            // console.log("Signed in");
            // JSONLog(userCredential.user);
            const {providerData, stsTokenManager} = userCredential.user;

            // updateProfile(providerData[0]);
            const userD = providerData[0] || {}
            updateAccount({
              ...userD,
              token: stsTokenManager
            });

            setLoading(false)
          })
          .catch((error)=>{
              const err = HandleFirebaseError(error);
              setFormErrors(()=>err);
              setLoading(false)
          })
      })
      .catch(err=>{
          setFormErrors(()=>err);
          setLoading(false)
      })

      
      setLoading(true)
      setFormErrors(()=>({}));
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
                  schema={authSchema} 
                  authLabel={loading ? "Loging In..." :"LOGIN" }
                  remember={true} 
                  forgotPassword={true}
                  sso = {true}
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
