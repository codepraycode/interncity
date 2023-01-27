import {StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import React, { useState } from 'react'
import Theme from '../../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';

const CustomTextInput = (props) => {
    const {schema} = props;
    let template;

    if (schema.type === 'password') template = <PasswordInput {...props}/>;
    else if (schema.type === 'email') template = <EmailInput {...props}/>;
    else template = <NormalInput {...props}/>;
    
    return (
        <View style={styles.container}>
            <Text label style={styles.label}>{schema.label}</Text>
            {
                template
            }
            <Text style={{color: Theme.red}}></Text>
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

const EmailInput = ({schema, onChange, name, value})=>{
    
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {Theme.accent}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            autoComplete = {"off"}
            value = {value}
            textContentType = {"emailAddress"}
        />
    )
}

const PasswordInput = (props)=>{
    const {schema, onChange, name, value} = props;
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
                <Octicons name={hidePassword ? "eye":'eye-closed'} size={30} color={Theme.grey400} />
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
        fontSize: 16,

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