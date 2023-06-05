import TextInput from "./TextInput";
import CheckBox, { ToggleSelect } from "./CheckBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Button from '../Button';
import { useMemo, useState } from "react";
import Theme from '../../constants/theme';
import { ImageUpload } from "./FileInput";
import { useForm } from '../../hooks';
import useAppContext from "../../context";
import { JSONLog } from "../../app/utils";
import { screenNames } from "../../config/screens";
import SSO from "../SSO";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export {TextInput, CheckBox}


/* 
*/


const FormSchemaRenderer = ({schema, manager }) =>{

    /* 
        Schema is the form schema to render with
        Manager is the form state to work with.
    */

    const getTemplate = (name, schema, key=0) => {

        // name - field name
        // Schema - field schema
        // Key - unique id for rendering.

        // Common props
        const props = {
            name,
            schema,
            key,
            value: manager.values[name], //formData[name],
            onChange: (field, value) => { manager.handleChange(field, value)}, // also validator
            error: manager.errors[name], //errors && errors[name]
        }

        let template;

        switch (schema.type) {
            case 'image':
                template = <ImageUpload {...props} />
                break
            case 'bool':
                template = <ToggleSelect {...props} />
                break
            default:
                template = <TextInput {...props} />
                break
        }

        return template;
    }

    // Load form elements from given schema
    const formElements = useMemo(()=>{
        let elements = Object.entries(schema).map((item, index)=>{
            const [field, fieldSchema] = item;

            return getTemplate(field, fieldSchema, index);
        });

        return elements;

    }, [schema]);


    return formElements;
}


const Form = ({
    schema, // object - form schema
    getPreviousValues, // function - load previous values
    forgotPassword, // boolean - include forget password feature
    disable, // boolean - disable submit button
    authLabel, // string - status label
    onSubmit, // function - submit function to trigger
    errors, // object - form errors
})=>{
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
        
            <Text style={{color: Theme.red, marginVertical: 10,}}>{errors?.message}</Text>

            <FormSchemaRenderer schema={schema}/>

            <View style={[styles.container, styles.cta]}>
                <Button 
                    text={authLabel || 'Continue'} 
                    onPress={()=>onSubmit(formData)}
                    disable={disable}
                />
            </View>
        </>
    )
}



// For authentication Screens specifically.
export const AuthenticationForm = ({
    schema, // object - form schema
    remember=true, // boolean - include remeber me
    forgotPassword=true, // boolean - include forget password feature
    loadingLabel="Loading...", // string - status label
    login, // boolean - indicate it's a login auth form
    createAccount, // boolean - indicate it's a create account form

    // Screen Navigation handler
    handleNavigate,
    
}) => {

    const { showToast } = useAppContext();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        schema,
        // initialValues: {},
        onSubmit: (values)=>{

            if (login){
                handleLogin(values);
                return
            }

            if (createAccount){
                setLoading(true);
                handleCreateAccount(values);
                return
            }
        }
    });    

    const handleLogin = ( data ) =>{
        if (loading) return;

        const { email, password } = data;

        setLoading(true);
        // console.log("Logging in...")
        // JSONLog(data);

        signInWithEmailAndPassword(auth, email, password)
        // .then(()=>{

        // })
        .catch((error)=>{
            console.error(error);
            showToast("Could not login");
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    const handleCreateAccount = ( data ) =>{
        console.log("Creating Account...")
        JSONLog(data);

        if (loading) setTimeout(() => setLoading(false), 3000);
        return;
    }


    const handleForgotPassword = () =>{
        showToast('Not implemented')
    }

    let btnText;

    if (login) btnText = 'Login';
    else if (createAccount) btnText = 'Create account';
    else btnText = "Continue";

    return (
        <>
            <Text
                style={{ color: Theme.red, marginVertical: 10, }}
            >
                {form.errors._general}
            </Text>

            <FormSchemaRenderer schema={schema} manager={form}/>

            <View style={styles.container}>
                {
                    remember && <CheckBox label={"Remember me"} />
                }

                {
                    forgotPassword && (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={handleForgotPassword}
                            style={{
                                marginLeft:'auto'
                            }}
                        >
                            <Text p>Forgot password?</Text>
                        </TouchableOpacity>
                    )
                }

            </View>

            <View style={[styles.container, styles.cta]}>
                <Button
                    text={loading ? loadingLabel : btnText}
                    onPress={form.handleSubmit}
                    disable={loading}
                />
            </View>

            <SSO
                google={"Sign in with Google"}
            />

            <TouchableOpacity
                onPress={() => !loading && handleNavigate()}
                activeOpacity={0.6}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{ marginTop: 20, color: Theme.accent }}
                >
                    <Text>You don't have an account yet?</Text> <Text secondary a>Sign Up</Text>
                </Text>
            </TouchableOpacity>
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