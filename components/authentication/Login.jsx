import React from 'react';
import {View, Text, Image, Icon, Colors} from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';

/* 
    Login screen
*/

const Login = ()=>{
    return (
        
        <View style={styles.container}>
            <Text>Login Screen!</Text>
        </View>
    )
}

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  
});
