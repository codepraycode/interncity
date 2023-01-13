import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Button from '../Button';
import SSO from "../SSO";
import { useState } from "react";

export {TextInput, CheckBox}


const Form = ({schema, remember, forgotPassword, authLabel, footer})=>{
    const [formData, setFormData] = useState({});

    const updateFormData = (field, value)=>{
        if (Object.is(formData[field], value)) return;

        setFormData((prev)=>{
            return {...prev, [field]:value};
        })

    }


    return (
        <>
            {
                Object.entries(schema).map(([field, fieldSchema], i)=>(
                    <TextInput 
                        name={field} 
                        schema={fieldSchema} 
                        key={i} 
                        value={formData[field]} 
                        onChange={updateFormData}
                    />
                ))
            }

            <View style={styles.container}>
                {
                    remember && <CheckBox/>
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
                <Button text={authLabel || 'Continue'}/>
            </View>

            {/* Call to action */}
            <View style={[styles.container, styles.cta, {flexDirection:'column', marginTop:20,}]}>
                <SSO google={true}/>
                
                
            </View>
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

        marginTop: 15,
    },

    cta:{
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'column',
        marginTop:30,
        // textDecorationLine: 'underline'
    }


})