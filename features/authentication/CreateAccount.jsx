import React from 'react';
import {View, Text, Image, Icon, Colors} from 'react-native-ui-lib';
import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {createAccountSchema} from '../../constants/dummy';
import Form from '../../components/form';
/* 
    CreateAccount screen
*/

const CreateAccount = ({ onSwitch })=>{
    return (
        <ScrollView contentContainerStyle={styles.formContainer} >
            {/* Top view with wave and title */}
            <View style={styles.top} >
                <Image assetName="wave" assetGroup="assets" width={71} height={71}/>
                <Text h2>Create Account</Text>
            </View>

            {/* Auth form */}
            <View style={styles.container}>
                <Form schema={createAccountSchema} authLabel={"SIGN UP"}/>

                <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}}>
                    <Text small style={{marginTop: 20,}}>
                        <Text>Already have an account?</Text>  <TouchableOpacity onPress={()=>onSwitch()}><Text secondary a>Sign In</Text></TouchableOpacity>
                    </Text>
                </TouchableOpacity>

            </View>

            

        </ScrollView>
    )
}

export default CreateAccount;


const styles = StyleSheet.create({
  top: {
    // flex: 1,
    // flex:1,
    height:"20%",
    // paddingBottom:25,
    alignItems:'center',
    justifyContent:'flex-end'
  },


  formContainer:{
    // flex:1,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },

  container:{
    paddingVertical: 30,
  },
  
});
