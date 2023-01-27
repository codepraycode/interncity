import React, { useContext, useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {authSchema} from '../../constants/dummy';
import Form from '../../components/form';
import AppContext from '../../app/context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../app/firebaseConfig';
import {HandleFirebaseError, JSONLog} from '../../app/utils';
import { UserAccount } from '../../app/models/User';

/* 
    Login screen
*/

const Login = ({ navigation })=>{
    const auth = getAuth(app);

    const {signIn} = useContext(AppContext);
    const [formErrors, setFormErrors] = useState({});


    const handleLogin = (loginData)=>{
      console.log("Login with:", loginData);
      const {email, password} = loginData;

      // const demo = {
      //   email:"me@ccodepraycode.com",
      //   password: "letmein123"
      // }

      UserAccount.validateAuthData({email, password})
      .then((value)=>{
          signInWithEmailAndPassword(auth,value.email, value.password)
          .then((userCredential)=>{
            console.log("Signed in");
            JSONLog(userCredential.user);
          })
          .catch((error)=>{
              const err = HandleFirebaseError(error);
              setFormErrors(()=>err);
          })
      })
      .catch(err=>{
          setFormErrors(()=>err);
      })

      
      setFormErrors(()=>({}));
    }

    return (
        <View style={styles.formContainer}>
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
                  authLabel="LOGIN" 
                  remember={true} 
                  forgotPassword={true}
                  sso = {true}
                  errors={formErrors}
                />

                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text small style={{marginTop: 20,}}>
                        <Text>You don't have an account yet?</Text>  <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}><Text secondary a>Sign Up</Text></TouchableOpacity>
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default Login;


const styles = StyleSheet.create({
  top: {
    // flex: 1,
    // flex:1,
    height:"25%",
    // paddingBottom:25,
    alignItems:'center',
    justifyContent:'flex-end'
  },


  formContainer:{
    flex:1,
    paddingHorizontal: 20,
  },

  container:{
    paddingVertical: 30,
  },
  
});
