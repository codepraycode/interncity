import { Text, View} from 'react-native-ui-lib';
import { StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react'
import Theme from '../../constants/theme';
import {userTypes} from '../../app/utils';

const ProfileUserTypeScreen = ({ navigation }) => {
    const handleSelection = (selectedType)=>{
        navigation.navigate("ProfileForm", {
          profileType: selectedType
        })
    }

    return (

      <View center flex style={styles.optionContainer}>
          {/*Options  */}
          <Text h3>Select account type?</Text>
          
          <TouchableOpacity onPress={()=>handleSelection(userTypes.STUDENTS)} activeOpacity={0.7} style={styles.option}>
            <Text label style={styles.optionText}>Student</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>handleSelection(userTypes.ORGANIZATION)}  activeOpacity={0.7} style={styles.option}>
            {/* <Octicons name={"organization"} size={30} color={Theme.accent} /> */}
            <Text label style={styles.optionText}>Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>handleSelection(userTypes.SUPERVISOR)} activeOpacity={0.7} style={styles.option}>
            <Text label style={styles.optionText}>Institution Supervisor</Text>
          </TouchableOpacity>
      </View>
    )
}

export default ProfileUserTypeScreen;


const styles = StyleSheet.create({

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
