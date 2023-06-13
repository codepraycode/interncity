import { Text, View } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import {theme as Theme} from '../../resources';
import { userTypes } from '../../config/constants';
import { useRouter } from 'expo-router';
import { screenNames } from '../../config/screens';
import { useProfile } from '../../hooks';

const ProfileUserTypeScreen = () => {

    const router = useRouter();
    const { profile } = useProfile();

    const handleSelection = (selectedType) => {

        // router.push(screenNames.newProfile);
        router.replace({ 
            pathname: screenNames.newProfile,
            params: {
                type: selectedType
            }
        });
    }

    const selected = profile?.type;

    return (

        <View center flex style={styles.optionContainer}>
            {/*Options  */}
            <Text h3>Select account type?</Text>

            <TouchableOpacity
                onPress={() => handleSelection(userTypes.STUDENTS)} 
                activeOpacity={0.7}
                style={[styles.option, selected === userTypes.STUDENTS ? styles.selected: null]}
            >
                <Text label style={styles.optionText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleSelection(userTypes.ORGANIZATION)}
                activeOpacity={0.7}
                style={[styles.option, selected === userTypes.ORGANIZATION ? styles.selected: null]}
            >
                {/* <Octicons name={"organization"} size={30} color={Theme.accent} /> */}
                <Text label style={styles.optionText}>Organization</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleSelection(userTypes.SUPERVISOR)}
                activeOpacity={0.7}
                style={[styles.option, selected === userTypes.SUPERVISOR ? styles.selected: null]}
            >
                <Text label style={styles.optionText}>Institution Supervisor</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileUserTypeScreen;


const styles = StyleSheet.create({

    selected: {
        backgroundColor: Theme.grey300,
        borderColor: Theme.lightSecondary,
    },
    option: {
        backgroundColor: Theme.grey100,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Theme.lightSecondary,
        borderWidth: 1,
        elevation: 3,
        width: 150,
        height: 150,
        marginTop: 20,
    },
    optionText: {
        textTransform: 'capitalize',
    }

});
