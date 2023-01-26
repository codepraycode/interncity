import React, { useContext, useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {CreateAccountFormSchema} from '../../constants/FormSchema';
import Form from '../../components/form';
import AppContext from '../../app/context';
// import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
/* 
    CreateAccount screen
*/

const SelectType = ({onSelected})=>{
    return (
      <View center flex style={styles.optionContainer}>
          {/*Options  */}
          <Text h3>Select account type?</Text>
          
          <TouchableOpacity onPress={onSelected} activeOpacity={0.7} style={styles.option}>
            <Text label style={styles.optionText}>Student</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onSelected}  activeOpacity={0.7} style={styles.option}>
            {/* <Octicons name={"organization"} size={30} color={Theme.accent} /> */}
            <Text label style={styles.optionText}>Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSelected} activeOpacity={0.7} style={styles.option}>
            <Text label style={styles.optionText}>School Supervisor</Text>
          </TouchableOpacity>
      </View>
    )
}

const CreateAccount = ({ navigation })=>{
    const {signUp} = useContext(AppContext);
    const [accountType, setAccountType] = useState(null);

    const {type, ...restFormSchema} = CreateAccountFormSchema;

    if (!accountType) return <SelectType onSelected={(typeSelected)=>setAccountType(typeSelected)}/>
    
    return (
      <SafeAreaView style={{flex:1,}}>
        <ScrollView contentContainerStyle={styles.formContainer} >
            {/* Top view with wave and title */}
            <View style={styles.top} >
                <Image assetName="wave" assetGroup="assets" width={71} height={71}/>
                <Text h2>Create Account</Text>
            </View>

            {/* Auth form */}
            <View style={styles.container}>
                <Form 
                  onSubmit={(data)=>{
                    console.log(data);
                    // signUp("sample data");
                    // navigation.navigate("SignIn");
                  }} 
                  schema={restFormSchema} 
                  authLabel={"SIGN UP"}
                  sso = {true}
                />

                <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}}>
                    <Text small style={{marginTop: 20,}}>
                        <Text>Already have an account?</Text>  <TouchableOpacity onPress={()=>navigation.navigate("SignIn")}><Text secondary a>Sign In</Text></TouchableOpacity>
                    </Text>
                </TouchableOpacity>

            </View>

            

        </ScrollView>
      </SafeAreaView>
    )
}

export default CreateAccount;


const styles = StyleSheet.create({
  top: {
    alignItems:'center',
    justifyContent:'flex-end'
  },

  formContainer:{
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 60,
  },

  container:{
    paddingVertical: 30,
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
