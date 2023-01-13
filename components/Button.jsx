import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Text  } from 'react-native-ui-lib'
import Theme from '../constants/theme';

const CustomButton = ({text}) => {
    return (

        <TouchableOpacity style={styles.container} activeOpacity={0.6}>
            <Text label style={{color: Colors.white}}>{text}</Text>
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
    }
})
