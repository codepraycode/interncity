import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import { View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import Form from '../../components/form';
import Theme from '../../constants/theme';
import { UserAccount } from '../../app/models/User.js'
import SafeAreaLayout from '../../components/Layout';
import { database, collectionNames} from '../../app/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { JSONLog } from '../../app/utils';

const ProfileFormScreen = ({navigation, route}) =>{
    const userProfileCollectionRef = collection(database,collectionNames.USER_PROFILE);

    const {updateProfile} = useContext(AppContext);
    const {profileType} = route.params;
      
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCreateProfile = (data)=>{
      if (loading) return;
      console.log("create profile",data);

      addDoc(userProfileCollectionRef,{
        name:"Sample name",
        type: profileType,
      })
      .then(()=>{
        console.log("Created document")
      })
      .catch((err)=>{
        console.log("Error creating document")
        console.log(err);
      })
      // updateProfile({dt:"sample data"});
      // navigation.navigate("ProfileSuccess");
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
      
    })

    const formSchema = UserAccount.getProfileSchema(profileType);

    return (
        <SafeAreaLayout scrollStyle={{marginTop:-35}} style={{paddingTop: 0}}>
            {/* Auth form */}
            <View style={styles.container}>
                <Form
                    onSubmit={(data)=> handleCreateProfile(data)} 
                    schema={formSchema} 
                    authLabel={ loading ? "Creating profile...":"Create Profile"}
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