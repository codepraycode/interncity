import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import Theme from '../../constants/theme';

import { 
    EmailInput, 
    NormalInput, 
    PasswordInput, 
    SchoolSelect 
} from './FormComponents';

const CustomTextInput = (props) => {
    const {schema, error} = props;
    let template;

    if (schema.type === 'password') template = <PasswordInput {...props}/>;
    else if (schema.type === 'email') template = <EmailInput {...props}/>;
    else if (schema.type === 'school') template = <SchoolSelect {...props}/>;
    else template = <NormalInput {...props}/>;
    
    return (
        <View style={styles.container}>
            <Text label style={styles.label}>{schema.label}</Text>
            {
                template
            }
            <Text style={{color: Theme.red}}>{error}</Text>
        </View>
    )
}





export default CustomTextInput;


const styles = StyleSheet.create({
    container:{
        marginVertical: 4,
    },
    label:{
        marginBottom: 10,
        color: Theme.main,
    },

})