import {View, Picker} from 'react-native-ui-lib';
import React, { useContext, useState } from 'react'
import {StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Theme from '../../constants/theme';
import AppContext from '../../app/context';
import { JSONLog } from '../../app/utils';

const NormalInput = ({schema, onChange, name, value})=>{
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            autoComplete = {"off"}
            value = {value}
            inputMode={"text"}
        />
    )
}

const EmailInput = ({schema, onChange, name, value})=>{
    
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            autoComplete = {"off"}
            value = {value}
            textContentType = {"emailAddress"}
            inputMode={"email"}
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
                placeholderTextColor = {styles.placeholderTextColor}
                onChangeText={(str)=>{onChange(name, str)}}
                style={[styles.passwordinput, styles.input]}
                autoComplete={"off"}
                value = {value}
                secureTextEntry = {hidePassword}
                textContentType = {"password"}
            />

            <TouchableOpacity activeOpacity={0.6} onPress={()=>setHidePassword(p=>!p)}>
                <Octicons name={hidePassword ? "eye":'eye-closed'} size={30} color={Theme.grey400} />
            </TouchableOpacity>
        </View>
    )
}

const SchoolSelect = React.memo(({schema, onChange, name, value})=>{

    const {schools} = useContext(AppContext);    

    const options = schools || [];

    return (
        <Picker
            placeholder="Click to select school"
            placeholderTextColor={styles.placeholderTextColor}
            value={value}
            enableModalBlur={false}
            onChange={({label, value}) => {
                onChange(name, value)
                console.log("Picked", label);
            }}
            topBarProps={{title: 'Languages'}}
            style = {[styles.input, styles.normalInput, { height: "100%" }]}
            containerStyle= {{ height:55 }}
            showSearch
            searchPlaceholder={'Search a language'}
            searchStyle={{color:Theme.accent, fontFamily:"FontBold"}}
            migrateTextField
        >
        {options.map((option, i)=> (
            <Picker.Item 
                key={i} 
                value={option.id} 
                label={option.name} 
                disabled={false} 
                labelStyle={{color: Theme.accent}}
            />
        ))}
        </Picker>

    )
})


export {
    NormalInput,
    EmailInput,
    PasswordInput,
    SchoolSelect,
}



const styles = StyleSheet.create({
    
    placeholderTextColor: Theme.grey300,
    input: {
        height: 55,

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
        elevation: 1,
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
        elevation: 1,
    }
})