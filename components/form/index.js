import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Button from '../Button';
import SSO from "../SSO";
import { useState } from "react";
import Theme from '../../constants/theme';
import { ImageUpload } from "./FileInput";

export {TextInput, CheckBox}


const Form = ({schema, getPreviousValues, remember, forgotPassword, disable, authLabel, onSubmit, sso, errors})=>{
    const loadPreviousValues = getPreviousValues || function (){
        return {}
    }
    const [formData, setFormData] = useState(()=>{
        return loadPreviousValues();
    });

    const updateFormData = (field, value)=>{
        if (Object.is(formData[field], value)) return;

        setFormData((prev)=>{
            return {...prev, [field]:value};
        })
    }

    const getTemplate = (name, schema, key)=>{

        const props = {
            name,
            schema,
            key,
            value: formData[name],
            onChange: updateFormData,
            error: errors && errors[name]
        }

        if (schema.type === 'image') return <ImageUpload {...props} />

        return <TextInput {...props}/>

    }
    return (
        <>
        
            <Text style={{color: Theme.red, marginVertical: 10,}}>{errors?.message}</Text>

            {
                Object.entries(schema).map(([field, fieldSchema], i)=>getTemplate(field, fieldSchema, i))
            }

            <View style={styles.container}>
                {
                    remember && <CheckBox label = {"Remember me"}/>
                }

                {
                    forgotPassword && (
                        <TouchableOpacity>
                            <Text p>Forgot password?</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>

            <View style={[styles.container, styles.cta]}>
                <Button 
                    text={authLabel || 'Continue'} 
                    onPress={()=>onSubmit(formData)}
                    disable={disable}
                />
            </View>

            {/* Call to action */}
            {
                sso && (
                    <View 
                        style={[styles.container, styles.cta, {flexDirection:'column', marginTop:20,}]}
                    >
                        <SSO google={true}/>
                    </View>
                )
            }
        </>
    )
}

export default Form;



const styles = StyleSheet.create({
    container:{
        // backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

        marginTop: 10,
    },

    cta:{
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'column',
        marginTop:20,
        // textDecorationLine: 'underline'
    }


})