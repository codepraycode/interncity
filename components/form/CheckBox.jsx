import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {Text, View, Colors} from 'react-native-ui-lib'

const CheckBox = () => {
  return (

    <TouchableOpacity style={styles.checkContainer}>
        <>
            <View style={styles.box}>
                <View style={styles.marker} />
            </View>

            <Text p>Remember me</Text>
        </>
    </TouchableOpacity>
  )
}

export default CheckBox;


const styles = StyleSheet.create({

    checkContainer:{
        flexDirection: 'row',
        alignItems:'center',

    },
    box:{
        height: 24,
        width: 24,
        backgroundColor: Colors.grey200,
        borderRadius: 6,
        marginRight: 10,
        alignItems:'center',
        justifyContent:'center'
    },

    // marker:{
    //     width: 10,
    //     height: 10,
    //     borderRadius: 5,
    //     backgroundColor: Colors.main,
    // }
})