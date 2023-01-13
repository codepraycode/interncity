import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import Button from '../Button';

export {TextInput, CheckBox}


const Form = ({schema})=>{
    return (
        <>
            <TextInput schema={schema.email}/>
            <TextInput schema={schema.password}/>

            <View style={styles.container}>
                <CheckBox/>

                <TouchableOpacity>
                    <Text p>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container, {justifyContent:'center', marginTop:30}]}>
                <Button text="Login"/>
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


})