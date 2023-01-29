import React, { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import Button from '../../components/Button';



const ProfileSuccessScreen = ({ navigation, route }) =>{
    // console.log(route.params);
    const {profile} = route.params;
    const {updateAccountProfile, isOrganization, isIntern} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    let term = '';

    if (isOrganization) term = "Organization";
    else if (isIntern) term = "Internship";

    return (

        <View flex>
            {/* Top view with wave and title */}
            <View flex-2 center>
                <Image assetName="illu" assetGroup="assets" width={250} height={250}/>
            </View>

            {/* Success content */}
            <View flex-1 centerH>
                <Text h3>Profile update successful</Text>

                <Text p marginV-30 style={{width:"70%", textAlign:'center', }}>
                    Your {isIntern && "application"} information has been updated successfully!. {isIntern && "You can now go ahead to apply for internship roles"}
                </Text>

                <Button 
                    text={loading ? "Finishing up..." : "Finish"}
                    onPress={()=>{
                    updateAccountProfile(profile);
                    setLoading(true);
                }}/>
            </View>

            

        </View>
    )
}

export default ProfileSuccessScreen;