import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-ui-lib'
import Theme from '../constants/theme';

const CustomButton = ({text, disable, onPress, small, style}) => {
    const customStyles = style || null;
    console.log(customStyles);

    return (

        <TouchableOpacity 
            style={[small ? styles.btnSmall : styles.container, disable && styles.disable, customStyles]}
            activeOpacity={0.6}
            onPress={onPress}
        >
            <Text 
                label 
                style={{
                    color: small ? Theme.grey100 : Theme.white,
                    fontSize: 14,
                    paddingHorizontal: 10,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;



const styles = StyleSheet.create({
    container:{
        backgroundColor: Theme.main,
        width: "75%",
        paddingVertical: 15,
        borderRadius: 6,
        alignItems:'center',
        justifyContent:'center',
    },
    btnSmall:{
        backgroundColor: Theme.accent,// for disabled Theme.grey300,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        alignItems:'center',
        justifyContent:'center',
    },
   
    disable:{
        opacity: 0.5,
    }
})
