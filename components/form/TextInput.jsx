import {StyleSheet,TextInput, TouchableHighlight} from 'react-native';
import {View, Text, Colors, Icon} from 'react-native-ui-lib';
import React from 'react'

const CustomTextInput = ({schema}) => {
    
  return (
    <View style={styles.container}>
      <Text label style={styles.label}>{schema.label}</Text>
      {
        schema.type === 'password' ? <PasswordInput/> : <NormalInput/>
      }
    </View>
  )
}


const NormalInput = ( )=>{
    return (
        <TextInput
            placeholder={'Placeholder'}
            floatingPlaceholder
            onChangeText={(e)=>{}}
            style={[styles.input, styles.normalInput]}
            autoComplete={"off"}
        />
    )
}
const PasswordInput = ()=>{
    return (
        <View style={styles.passwordContainer}>
            <TextInput
                placeholder={'Placeholder'}
                floatingPlaceholder
                onChangeText={(e)=>{}}
                style={[styles.passwordinput, styles.input]}
                autoComplete={"off"}
            />

            <TouchableHighlight >
                <Icon assetName="eyeOpen" assetGroup="assets" size={30}/>
            </TouchableHighlight>
        </View>
    )
}

export default CustomTextInput;


const styles = StyleSheet.create({
    container:{
        marginVertical: 15,
    },
    label:{
        marginBottom: 10,
    },
    input: {
        height: 50,
        
        paddingVertical: 17,
        paddingLeft: 16,
        paddingRight: 10,
        
        
        color:Colors.accent,
        fontSize: 12,

    },

    normalInput:{
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor:Colors.white,
        borderColor:Colors.white,
        elevation: 2,
        shadowOffset: 1,
    },

    passwordinput:{
        width:"85%",
    },

    passwordContainer:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent: 'space-between',
        backgroundColor:Colors.white,
        borderRadius: 10,
        elevation: 2,
        // shadowOffset: 1,
        // shadowOpacity: .5,
        // shadowColor: Colors.$backgroundElevated,
        // shadowRadius: 3,
    }
})