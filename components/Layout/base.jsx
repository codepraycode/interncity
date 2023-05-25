import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const BaseSafeAreaLayout = ({ children, scrollStyle, style }) => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
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

export default BaseSafeAreaLayout;

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        paddingBottom: 50,
        paddingTop: 50,
    },

})
