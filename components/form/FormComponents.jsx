import {View, Picker} from 'react-native-ui-lib';
import React, { useContext, useState } from 'react'
import {StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Theme from '../../constants/theme';
import AppContext from '../../app/context';
import { JSONLog } from '../../app/utils';

const NormalInput = React.memo(({schema, onChange, name, value})=>{
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
})

const LongTextInput = React.memo(({schema, onChange, name, value})=>{
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput, {height: 105, paddingTop: 10,}]}
            autoComplete = {"off"}
            value = {value}
            inputMode={"text"}
            multiline={true}
            textAlignVertical={"top"}
            maxLength={300}
        />
    )
})

const EmailInput = React.memo(({schema, onChange, name, value})=>{
    
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            autoComplete = {"off"}
            value = {value}
            textContentType = {"emailAddress"}
            // inputMode={"email"}
            keyboardType={"email-address"}
        />
    )
})

const UrlInput = React.memo(({schema, onChange, name, value})=>{
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            value = {value}
            textContentType={"URL"}
            keyboardType={"url"}
        />
    )
})

const PhoneInput = React.memo(({schema, onChange, name, value})=>{
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            value = {value}
            textContentType={"telephoneNumber"}
            keyboardType={"phone-pad"}
        />
    )
})


const NumberInput = React.memo(({schema, onChange, name, value})=>{
    return (
        <TextInput
            placeholder = {schema.placeholder}
            placeholderTextColor = {styles.placeholderTextColor}
            onChangeText = {(str)=>onChange(name, str)}
            style = {[styles.input, styles.normalInput]}
            value = {value}
            // textContentType={"t"}
            keyboardType={"number-pad"}
        />
    )
})

const PasswordInput = React.memo((props)=>{
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
})

const SchoolSelect = React.memo(({schema, onChange, name, value})=>{

    const {schools} = useContext(AppContext);    

    const options = schools || [];

    return (
        <Picker
            placeholder="Click to select school"
            placeholderTextColor={styles.placeholderTextColor}
            value={value}
            enableModalBlur={false}
            onChange={({value}) => onChange(name, value)}
            topBarProps={{title: 'Select school'}}
            style = {[styles.input, styles.normalInput, { height: "100%" }]}
            containerStyle= {{ height:55 }}
            showSearch
            searchPlaceholder={'Search school'}
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

const DepartmentSelect = React.memo(({schema, onChange, name, value})=>{

    const {departments} = useContext(AppContext);    

    const options = departments || [];

    return (
        <Picker
            placeholder="Click to select department"
            placeholderTextColor={styles.placeholderTextColor}
            value={value}
            enableModalBlur={false}
            onChange={({value}) => onChange(name, value)}
            topBarProps={{title: 'Select department'}}
            style = {[styles.input, styles.normalInput, { height: "100%" }]}
            containerStyle= {{ height:55 }}
            showSearch
            searchPlaceholder={'Search department'}
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

const SectorSelect = React.memo(({schema, onChange, name, value})=>{

    const {sectors} = useContext(AppContext);    

    const options = sectors || [];

    return (
        <Picker
            placeholder="Click to select sector"
            placeholderTextColor={styles.placeholderTextColor}
            value={value}
            enableModalBlur={false}
            onChange={({value}) => onChange(name, value)}
            topBarProps={{title: 'Select sector'}}
            style = {[styles.input, styles.normalInput, { height: "100%" }]}
            containerStyle= {{ height:55 }}
            showSearch
            searchPlaceholder={'Search sector'}
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
    PhoneInput,
    PasswordInput,
    SchoolSelect,
    DepartmentSelect,
    SectorSelect,
    UrlInput,
    LongTextInput,
    NumberInput
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