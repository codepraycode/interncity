import React, { useContext, useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {CreateAccountFormSchema} from '../../constants/FormSchema';
import Form from '../../components/form';
import AppContext from '../../app/context';
import Theme from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../app/firebaseConfig';
import AuthLayout from './AuthLayout';
import { UserAccount } from '../../app/models/User';
import {HandleFirebaseError, JSONLog} from '../../app/utils';

/* 
    CreateAccount screen
*/

const SelectType = ({onSelected})=>{
    return (
      <View center flex style={styles.optionContainer}>
          {/*Options  */}
          <Text h3>Select account type?</Text>
          
          <TouchableOpacity onPress={()=>onSelected("student")} activeOpacity={0.7} style={styles.option}>
            <Text label style={styles.optionText}>Student</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>onSelected("organization")}  activeOpacity={0.7} style={styles.option}>
            {/* <Octicons name={"organization"} size={30} color={Theme.accent} /> */}
            <Text label style={styles.optionText}>Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>onSelected("supervisor")} activeOpacity={0.7} style={styles.option}>
            <Text label style={styles.optionText}>School Supervisor</Text>
          </TouchableOpacity>
      </View>
    )
}

const CreateAccount = ({ navigation })=>{
    const auth = getAuth(app);

    const [accountType, setAccountType] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const {type, ...restFormSchema} = CreateAccountFormSchema;

    const handleCreateAccount = (userData) =>{
      
      if (loading) return;

      const demo = {
        email:"me@codepraycode.com",
        password: "letmein123",
        confirmPassword: "letmein123",
      }


      UserAccount.validateCreateAccountData(demo)
      .then((value)=>{
        // navigation.navigate("SignIn");
          createUserWithEmailAndPassword(auth, value.email, value.password)
          .then((userCredential)=>{
            console.log("Signed in");
            JSONLog(userCredential.user);
            setLoading(false)
          })
          .catch((error)=>{
              const err = HandleFirebaseError(error);
              setFormErrors(()=>err);
              setLoading(false)
          })
      })
      .catch(err=>{
          // console.log("Error", err);
          setFormErrors(()=>err);
          setLoading(false)
      });
      
      setLoading(true)
      setFormErrors(()=>({}));
    }

    if (!accountType) return <SelectType onSelected={(typeSelected)=>setAccountType(typeSelected)}/>
    
    return (

        <AuthLayout>
            {/* Top view with wave and title */}
            <View style={styles.top} >
                <Image 
                  assetName="wave" 
                  assetGroup="assets" 
                  width={71} 
                  height={71}
                />
                <Text h2>Create Account</Text>
            </View>

            {/* Auth form */}
            <View style={styles.container}>
                <Form 
                  onSubmit={(data)=> handleCreateAccount(data)}
                  schema={restFormSchema} 
                  authLabel={loading ? "Signing Up..." : "SIGN UP" }
                  sso = {true}
                  errors={formErrors}
                  disable={loading}
                />

                {
                  !loading && (
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("SignIn")}
                        style={{
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                      >
                        <Text 
                          style={{marginTop: 20, color: Theme.accent}}
                        >
                          <Text>Already have an account?</Text> <Text secondary a>Sign In</Text>
                      </Text>
                    </TouchableOpacity>
                  )
                }
                

            </View>
            
        </AuthLayout>      
    )
}

export default CreateAccount;


const styles = StyleSheet.create({
  top: {
    alignItems:'center',
    justifyContent:'flex-end'
  },

  container:{
    paddingVertical: 10,
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
