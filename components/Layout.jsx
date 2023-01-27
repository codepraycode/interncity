import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaLayout = ({children, style}) => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <ScrollView contentContainerStyle={[styles.formContainer, style]}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SafeAreaLayout;

const styles = StyleSheet.create({
    formContainer:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop: 60,
    },

})
