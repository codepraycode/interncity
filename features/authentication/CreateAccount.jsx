import React, { useContext, useState } from 'react';
import {View, Text, Image } from 'react-native-ui-lib';
import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Form from '../../components/form';
import AppContext from '../../app/context';
import Theme from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../app/firebaseConfig';
import SafeAreaLayout from '../../components/Layout';
import { UserAccount } from '../../app/models/User';
import {HandleFirebaseError, JSONLog} from '../../app/utils';
/* 
    CreateAccount screen
*/


const CreateAccount = ({ navigation })=>{
    const auth = getAuth(app);
    const {updateAccount} = useContext(AppContext);

    
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const formSchema = UserAccount.getCreateAccountSchema();

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

          const {providerData, stsTokenManager} = userCredential.user;

          // updateProfile(providerData[0]);
          const userD = providerData[0] || {}

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

        <SafeAreaLayout>
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
                  schema={formSchema} 
                  authLabel={loading ? "Signing Up..." : "SIGN UP" }
                  sso = {false}
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
            
        </SafeAreaLayout>      
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
