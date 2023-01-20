import React from 'react'
import { View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { updatePasswordSchema } from '../../constants/dummy';
import Form from '../../components/form';


const UpdatePasswordScreen = ({navigation}) => {

    const navigateOut = (screenName)=>{
        navigation.goBack();
    }

    return (
        <View flex>

            <View style={{marginHorizontal: 20,}}>
                <Form
                    onSubmit={()=>navigateOut()} 
                    schema={updatePasswordSchema} 
                    authLabel={"Update"}
                />
            </View>
        </View>
    )
}

export default UpdatePasswordScreen;

const styles = StyleSheet.create({});