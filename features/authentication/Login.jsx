import React, { useContext, useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {authSchema} from '../../constants/dummy';
import Form from '../../components/form';
import AppContext from '../../app/context';
/* 
    Login screen
*/

const Login = ({ navigation })=>{
    const {signIn} = useContext(AppContext);
    const [formErrors, setFormErrors] = useState({});

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
                  // onSubmit={()=>{signIn("sample data")}} 
                  onSubmit={(data)=>{
                    signIn(data)
                    .then(()=>{
                      console.log("Signed in account!");
                      navigation.navigate("SignIn");
                    })
                    .catch((error)=>{
                      // console.log("error here:", error);
                      setFormErrors(()=>error);
                    })

                    // Clear errors first
                    setFormErrors(()=>({}));
                  }} 
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
