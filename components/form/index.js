import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Button from '../Button';
import SSO from "../SSO";
import { useState } from "react";
import Theme from '../../constants/theme';

export {TextInput, CheckBox}


const Form = ({schema, getPreviousValues, remember, forgotPassword,disable, authLabel, onSubmit, sso, errors})=>{
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

    return (
        <>
        
            <Text style={{color: Theme.red}}>{errors?.message}</Text>

            {
                Object.entries(schema).map(([field, fieldSchema], i)=>(
                    <TextInput 
                        name={field} 
                        schema={fieldSchema} 
                        key={i} 
                        value={formData[field]} 
                        onChange={updateFormData}
                        error={errors && errors[field]}
                    />
                ))
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