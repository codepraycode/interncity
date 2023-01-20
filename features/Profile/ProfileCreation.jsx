import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import Form from '../../components/form';
import { profileInfoSchema } from '../../constants/dummy';




const ProfileFormScreen = ({navigation}) =>{
    const {updateProfile} = useContext(AppContext);

    return (
        <SafeAreaView style={{flex: 1, paddingTop: 20}}>
            <ScrollView contentContainerStyle={styles.formContainer} >
                {/* Top view with wave and title */}
                <View style={styles.top} >
                    <Text h3>Profile Information</Text>
                </View>

                {/* Auth form */}
                <View style={styles.container}>
                    <Form
                        onSubmit={()=>{
                          updateProfile({dt:"sample data"});
                          navigation.navigate("ProfileSuccess");
                        }} 
                        schema={profileInfoSchema} 
                        authLabel={"Finish"}
                    />
                </View>

                

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  top: {
    paddingVertical: 20,
    alignItems:'center',
    justifyContent:'center'
  },


  formContainer:{
    // flex:1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
//   successContainer:{
//     flex:1,
//     // paddingBottom: 20,
//     // paddingHorizontal: 20,
//   },

  container:{
    paddingVertical: 30,
  },
  
});


export default ProfileFormScreen;