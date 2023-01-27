import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import Form from '../../components/form';
import Theme from '../../constants/theme';
import { UserAccount } from '../../app/models/User.js'
import SafeAreaLayout from '../../components/Layout';

const ProfileFormScreen = ({navigation, route}) =>{
    const {updateProfile} = useContext(AppContext);

    const {profileType} = route.params;
      
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCreateProfile = (data)=>{
      if (loading) return;
      console.log("create profile",data);
      // updateProfile({dt:"sample data"});
      // navigation.navigate("ProfileSuccess");
    }

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
    width: 300,
    maxWidth: "85%"
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