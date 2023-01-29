import React from 'react'
import { StyleSheet, ScrollView, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaLayout = ({children, scrollStyle, style}) => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <ScrollView 
                contentContainerStyle={[styles.formContainer, style]}
                bounces={false}
                style={[scrollStyle]}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SafeAreaLayout;

const styles = StyleSheet.create({
    formContainer:{
        alignItems:'center',
        paddingBottom: 50,
        paddingTop:50,
        // height:'100%'
        // backgroundColor:'red'
    },

})
