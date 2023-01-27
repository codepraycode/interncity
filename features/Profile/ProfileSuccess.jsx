import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import Button from '../../components/Button';




const ProfileSuccessScreen = ({ navigation }) =>{
    const {updateProfile, userType} = useContext(AppContext);
    let term = '';

    if (userType === 'organization') term = "Organization";
    else if (userType === 'intern') term = "Internship";

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
                    Your {userType === 'intern' && "application"} information has been updated successfully!. {userType === 'intern' && "You can now go ahead to apply for internship roles"}
                </Text>

                <Button text="Continue" onPress={()=>{
                    updateProfile({allSet:true})
                }}/>
            </View>

            

        </View>
    )
}

export default ProfileSuccessScreen;