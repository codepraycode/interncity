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
            style={styles.input}
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
                style={[styles.input, {width:"85%", backgroundColor:'transparent',}]}
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
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 17,
        paddingLeft: 16,
        paddingRight: 10,
        borderColor:Colors.white,
        backgroundColor:Colors.white,
        color:Colors.accent,
        fontSize: 12,
    },

    passwordContainer:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent: 'space-between',
        backgroundColor:Colors.white,
        borderRadius: 10,
    }
})