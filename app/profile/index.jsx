import React from 'react';
import { View, Text, Image } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {theme as Theme} from '../../resources';
import useAppContext from '../../context';
// import { Preloader, ErrorModal } from '../../components/Modal';

/* 
    Onboarding screen for create profile if profile isn't set or completed
*/

const ProfileOnboarding = () => { // onboarding for authentication

    const { profile, showToast, isOrganiztion, isIntern } = useAppContext();
    let term = isOrganiztion ? "Organization" : "Personal";

    const isProfileAvailable = profile.id;
    const isProfileComplete = profile.meta ? profile.meta.isComplete : profile._j?.meta?.isComplete;

    // console.log("Profile screen:", profile._j?.meta);

    let modal;

    if (!isProfileAvailable){
        showToast("No profile yet.")
    } else if (!isProfileComplete) {
        showToast("Incomplete profile.")
    }

    return (
        <>
            {modal}

            {/* Top container containing Logo */}
            <View style={styles.top}>
                <Image assetName="logo" assetGroup="assets" width={86} height={43} />
            </View>

            {/* middle container containing illustration */}
            <View style={styles.middle}>
                <Image assetName="memoji" assetGroup="assets" width={256} height={256} />
            </View>


            {/* middle container containing text and button */}
            <View style={styles.bottom}>
                <View
                    style={{
                        paddingLeft: 20,
                        // // alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text h1 style={{ width: "75%", color: Theme.main }}>
                        <Text>Provide Your </Text>
                        <Text secondary a>{term} </Text>
                        <Text>Information!</Text>
                    </Text>


                    {
                        isIntern && (

                            <Text p style={{ width: "75%", color: Theme.accent }}>
                                Explore all the most exciting internship
                                roles based on your study major.
                            </Text>
                        )
                    }

                </View>


                <TouchableOpacity
                    onPress={() => navigation.navigate("ProfileUserType")}
                    style={{
                        width: 60,
                        height: 60,
                        backgroundColor: Theme.main,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                        marginRight: 30,
                    }}
                >
                    <Image assetName="arrowRight" assetGroup="assets" width={30} height={25} />
                </TouchableOpacity>

            </View>

        </>
    )
}

export default ProfileOnboarding;


const styles = StyleSheet.create({
    top: {
        flex: 1,
        paddingTop: 80,
        paddingRight: 30,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    middle: {
        flex: 3,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 4,
        // paddingLeft: 20,
        // // alignItems: 'center',
        justifyContent: 'center',
    },
});
