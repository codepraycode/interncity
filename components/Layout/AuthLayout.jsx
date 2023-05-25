import React from 'react';
import { View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import BaseSafeAreaLayout from './base';


const AuthScreenLayout = ({children, headerText, ...rest}) => {
    return (
        <BaseSafeAreaLayout style={styles.formContainer} {...rest}>
            <View style={styles.top} >
                <Image 
                    assetName="wave"
                    assetGroup="assets"
                    width={71}
                    height={71}
                />
                <Text h2>{headerText}</Text>
            </View>

            <View style={styles.container}>
                {children}
            </View>
        </BaseSafeAreaLayout>
    )
}

export default AuthScreenLayout;

const styles = StyleSheet.create({
    formContainer:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop: 60,
    },
    top: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        paddingVertical: 10,
    },
})
