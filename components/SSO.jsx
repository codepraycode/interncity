import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon, Text  } from 'react-native-ui-lib'

const SSO = ({google}) => {
    return (

        <TouchableOpacity style={styles.container} activeOpacity={0.6}>
            <Icon assetName="google" assetGroup="assets" size={20}/>
            <Text label style={{color: Colors.pprimary, marginLeft: 15,}}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
    )
}

export default SSO;



const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.rgba(Colors.secondary, 0.2),
        width: "75%",
        paddingVertical: 15,
        borderRadius: 6,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
})
