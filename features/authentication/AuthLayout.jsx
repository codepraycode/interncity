import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthLayout = ({children}) => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <ScrollView contentContainerStyle={styles.formContainer} >
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default AuthLayout;

const styles = StyleSheet.create({
    formContainer:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop: 60,
    },

})
