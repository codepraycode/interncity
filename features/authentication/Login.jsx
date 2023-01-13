import React from 'react';
import {View, Text, Image, Icon, Colors} from 'react-native-ui-lib';
import { StyleSheet} from 'react-native';
import {authSchema} from '../../constants/dummy';
import Form from '../../components/form';
/* 
    Login screen
*/

const Login = ()=>{
    return (
        <View style={styles.formContainer}>
            {/* Top view with wave and title */}
            <View style={styles.top} >
                <Image assetName="wave" assetGroup="assets" width={71} height={71}/>
                <Text h2>Welcome Back</Text>
            </View>

            {/* Auth form */}
            <View style={styles.container}>
                <Form schema={authSchema}/>
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
