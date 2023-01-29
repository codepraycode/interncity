import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import Form from '../../components/form';
import Theme from '../../constants/theme';
import { UserAccount } from '../../app/models/User.js'
import SafeAreaLayout from '../../components/Layout';
import { app, database, collectionNames} from '../../app/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { JSONLog } from '../../app/utils';
import HeaderTitle from '../../components/HeaderTitle';
import { Preloader } from '../../components/Modal';

const ProfileFormScreen = ({navigation, route}) =>{
    const auth = getAuth(app);

    const userProfileCollectionRef = collection(database,collectionNames.USER_PROFILE);

    const {updateAccountProfile} = useContext(AppContext);
    
    const {profileType, inCompleteProfile, title} = route.params;
      
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCreateProfile = (updatedData)=>{
      if (loading) return;

      const data = {
        ...(inCompleteProfile || {}),
        ...updatedData
      }

      console.log("create profile",data);

      setLoading(true);
      setFormErrors(()=>({}));

      UserAccount.updateProfile(auth, data)
      .then(()=>{
        console.log("Created document")
        // return updateAccountProfile(data);
        navigation.navigate("ProfileSuccess", {
          profile: data,
        });
        setLoading(false);
      })
      .catch((err)=>{
        console.log("Error updating document")
        setFormErrors(()=>err);
        setLoading(false)
      })
    }

    const getAllDocs = ()=>{
      getDocs(userProfileCollectionRef)
      .then((res)=>{
        JSONLog(res.docs.map(item=> ({...item.data(), id:item.id})));
      })
      .catch(err=>{
        console.log("getDocs error:", err);
      })
    }

    const updateDocs = ()=>{
      const id = "1NOSUypqidOFc9OJcESp";
      const docToUpdate = doc(database, collectionNames.USER_PROFILE, id);

      updateDoc(docToUpdate, {
        email:"Abs@maile.com"
      })
      .then(()=>{
        console.log("Data updated")
      })
      .catch(err=>{
        console.log(err.message);
      })
    }

    const deleteADoc = ()=>{
      const id = "1NOSUypqidOFc9OJcESp";
      const docToDelete = doc(database, collectionNames.USER_PROFILE, id);

      deleteDoc(docToDelete)
      .then(()=>{
        console.log("Data deleted")
      })
      .catch(err=>{
        console.log(err.message);
      })
    }

    useEffect(()=>{

      if (Boolean(title)){
        navigation.setOptions({
          headerTitle: ()=><HeaderTitle title={title}/>,
        })
      }
      
    },[]);

    let formSchema = UserAccount.getProfileSchema(profileType);    
    const getPreviousValues = useCallback(()=>{
      // process the previous values
      let prev = {}
      
      if (!inCompleteProfile) return prev
      
      Object.keys(formSchema).forEach((fieldName)=>{
        if (!inCompleteProfile[fieldName]) return

        prev[fieldName] = inCompleteProfile[fieldName];
      });

      return prev;
    })


    return (
        <SafeAreaLayout scrollStyle={{marginTop:-35}} style={{paddingTop: 0}}>
            
            <Preloader show={loading} text="loading"/>
            
            {/* Auth form */}
            <View style={styles.container}>
                <Form
                    onSubmit={(data)=> handleCreateProfile(data)}
                    schema={formSchema} 
                    getPreviousValues={getPreviousValues}
                    authLabel={ !loading ? "Continue":"Loading..."}
                    errors={formErrors}
                    disable={loading}
                />
            </View>
        </SafeAreaLayout>
    )
}

const styles = StyleSheet.create({
  top: {
    paddingBottom: 10,
    margin:0,
  },

  container:{
    paddingVertical: 0,
    width: 400,
    maxWidth: "90%"
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


export default ProfileFormScreen;