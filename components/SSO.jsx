import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon, Text  } from 'react-native-ui-lib'
import Theme from '../constants/theme';

const SSO = ({google}) => {
    return (

        <TouchableOpacity style={styles.container} activeOpacity={0.6}>
            <Icon assetName="google" assetGroup="assets" size={20}/>
            <Text label style={{color: Colors.main, marginLeft: 15,}}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>
    )
}

export default SSO;



const styles = StyleSheet.create({
    container:{
        backgroundColor: Theme.lightSecondary,
        width: "75%",
        paddingVertical: 15,
        borderRadius: 6,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
})
