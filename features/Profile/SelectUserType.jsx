import { Text, View } from 'react-native-ui-lib';
import { ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import React from 'react'

const SelectUserType = () => {
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

export default SelectUserType;


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
