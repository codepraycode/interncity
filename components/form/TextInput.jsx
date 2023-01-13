import {StyleSheet,TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import {View, Text, Colors, Icon} from 'react-native-ui-lib';
import React, { useState } from 'react'
import Theme from '../../constants/theme';

const CustomTextInput = (props) => {
    const {schema} = props;
  return (
    <View style={styles.container}>
      <Text label style={styles.label}>{schema.label}</Text>
      {
        schema.type === 'password' ? <PasswordInput {...props}/> : <NormalInput {...props}/>
      }
    </View>
  )
}


const NormalInput = ({schema, onChange, name, value})=>{
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {Theme.accent}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            autoComplete = {"off"}
            value = {value}
        />
    )
}

const PasswordInput = ({schema, onChange, name, value})=>{
    const [hidePassword, setHidePassword] = useState(true);
    
    return (
        <View style={styles.passwordContainer}>
            <TextInput
                placeholder={schema.placeholder}
                placeholderTextColor = {Theme.accent}
                onChangeText={(str)=>{onChange(name, str)}}
                style={[styles.passwordinput, styles.input]}
                autoComplete={"off"}
                value = {value}
                secureTextEntry = {hidePassword}
            />

            <TouchableOpacity activeOpacity={0.6} onPress={()=>setHidePassword(p=>!p)}>
                <Icon assetName={hidePassword ? "eyeOpen": 'eyeClose'} assetGroup="assets" size={30}/>
            </TouchableOpacity>
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
        color: Theme.main,
    },
    input: {
        height: 50,
        
        paddingVertical: 17,
        paddingLeft: 16,
        paddingRight: 10,
        
        
        color:Theme.accent,
        fontSize: 12,

    },

    normalInput:{
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor:Theme.white,
        borderColor:Theme.white,
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
        backgroundColor:Theme.white,
        borderRadius: 10,
        elevation: 2,
        // shadowOffset: 1,
        // shadowOpacity: .5,
        // shadowColor: Colors.$backgroundElevated,
        // shadowRadius: 3,
    }
})