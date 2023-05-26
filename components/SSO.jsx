import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Icon, Text, View  } from 'react-native-ui-lib'
import Theme from '../constants/theme';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { JSONLog } from '../app/utils';


const googleProvider = new GoogleAuthProvider();

const GoogleSSO = ({ text }) => {
    /* 
        Google Authentication service
    */

    const handleProvider = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)

                JSONLog(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...

                console.log(errorCode);
                console.log(errorMessage);
                console.log(errorEmail);
            });
    }

    const ssoText = Boolean(text) ? text : "Continue with Google";
    return (

        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.6}
            onPress={()=>{}}
        >
            <Icon assetName="google" assetGroup="assets" size={20} />
            <Text label style={{ color: Colors.main, marginLeft: 15, }}>{ssoText}</Text>
        </TouchableOpacity>
    )
}

const SSO = ({ google }) => {
    const services = [];

    if (google) {
        services.push(<GoogleSSO key={services.length + 1} text={google || "Continue with Google"}/>)
    }

    return (
        <View
            style={styles.contentContainer}
        >
            {[...services]}
        </View>
    )
}

export default SSO;



const styles = StyleSheet.create({
    contentContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 20,
    },
    container:{
        backgroundColor: Theme.lightSecondary,
        width: "75%",
        paddingVertical: 15,
        borderRadius: 6,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
})
