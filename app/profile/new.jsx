import { useRouter, useLocalSearchParams } from "expo-router";
import { View } from "react-native-ui-lib"
// import useAppContext from "../../context";
import { userTypes } from '../../config/constants';

import { createOrganizationFormSchema,
    createStudentFormSchema,
    createSupervisorFormSchema } from "../../config/forms";

import SafeAreaLayout from "../../components/Layout";
import Form from "../../components/Form";
import { StyleSheet } from "react-native";
import { theme as Theme} from '../../resources';
import { useState } from "react";
import { Preloader } from "../../components/Modal";
import { JSONLog } from "../../utils";
import { useProfile } from "../../hooks";
import { screenNames } from "../../config/screens";
// import { auth } from "../../config/firebase";

const demo = {
    "avatar": null,
    "fullname": "Precious Olusola ",
    "phoneNumber": "98868058"
}


const createProfile = ({ navigation, route }) => {
    const router = useRouter();
    const { type } = useLocalSearchParams()
    const {profile, updateProfile} = useProfile(true);

    const [formErrors, setFormErrors] = useState(()=>{
        if (profile.meta?.error) return profile.meta.error;
    });
    const [loading, setLoading] = useState(false);

    const profileType = type || profileType;

    const handleCreateProfile = async (newData) => {
        if (loading) return;

        setLoading(true); // set laoding state to true.
        setFormErrors(() => ({})); // set form errors to empty.

        const data = {
            // type: profileType, // new type selected
            // updated data
            ...profile,
            ...demo,
            ...newData
        }

        updateProfile(data)
            .then(() => {
                // navigation.navigate("ProfileSuccess");
                router.replace(screenNames.home);
                setLoading(false);
            })
            .catch((err) => {
                // JSONLog("Error",err);
                setFormErrors(() => err);
                setLoading(false);
            })

    }

    // useEffect(() => {

    //     if (Boolean(title)) {
    //         navigation.setOptions({
    //             headerTitle: () => <HeaderTitle title={title} />,
    //         })
    //     }

    // }, []);

    // const profileType = newProfile?.type; //userProfile?.type || selectedProfileType;

    let formSchema; ///UserAccount.getProfileSchema(profileType);

    // JSONLog(formErrors)

    // Load schema
    if (profileType === userTypes.ORGANIZATION) formSchema = createOrganizationFormSchema;
    else if (profileType === userTypes.SUPERVISOR) formSchema = createSupervisorFormSchema;
    else formSchema = createStudentFormSchema;

    return (
        <SafeAreaLayout
            scrollStyle={{ marginTop: 25 }}
            style={{ paddingTop: 0 }}
        >

            <Preloader show={loading} text="loading" />

            {/* Auth form */}
            <View style={styles.container}>
                <Form
                    schema={formSchema}
                    initials={{}}
                    onSubmit={handleCreateProfile}
                    authLabel={!loading ? "Continue" : "Loading..."}
                    errors={formErrors}
                    disable={loading}
                />
            </View>
        </SafeAreaLayout>
    )
}

export default createProfile;


const styles = StyleSheet.create({
    top: {
        paddingBottom: 10,
        margin: 0,
    },

    container: {
        paddingVertical: 0,
        width: 400,
        maxWidth: "90%"
    },

    option: {
        backgroundColor: Theme.grey101,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Theme.lightSecondary,
        borderWidth: 1,
        elevation: 3,
        width: 150,
        height: 150,
        marginTop: 20,
    }

});