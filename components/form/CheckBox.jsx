import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {Switch, Text, View } from 'react-native-ui-lib'
import Theme from '../../constants/theme'

const CheckBox = ({ label }) => {

    const [checked, setChecked] = useState(false);

    return (

        <TouchableOpacity onPress={()=>setChecked(p=>!p)} activeOpacity={0.6} style={styles.checkContainer}>
            <>
                <View style={styles.box}>
                    {checked && <View style={styles.marker} />}
                </View>

                <Text p>{ label }</Text>
            </>
        </TouchableOpacity>
    )
}


export const ToggleSelect = ({onChange, name, value})=>{
    return (
        <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginBottom:10
            }}
        >
            <Switch
                value={value} 
                onValueChange={(val) => onChange(name, !value)}
                onColor={Theme.main}
                thumbSize={16}
                style={{
                    height: 20,
                    width: 45,
                }}
            />
            <Text i style={{ marginLeft: 10, }}>
                {value ? "Open for application" :"Closed for application"}
            </Text>
        </View>
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
        backgroundColor: Theme.grey200,
        borderRadius: 7,
        marginRight: 8,
        alignItems:'center',
        justifyContent:'center'
    },

    marker:{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.main,
    }
})