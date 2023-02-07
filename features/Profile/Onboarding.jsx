import React, { useContext, useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';
import Theme from '../../constants/theme';
import AppContext from '../../app/context';
import {ErrorModal, Preloader} from '../../components/Modal';
import UserAccount from '../../app/models/User';
import { auth} from '../../app/firebaseConfig';
import { JSONLog } from '../../app/utils';

/* 
    Onboarding screen for create profile if profile isn't set or completed
*/

const Onboarding = ({ navigation })=>{ // onboarding for authentication

    const {updateAccountProfile, isOrganization, isIntern} = useContext(AppContext)
    let term = '';

    const [isCheckingForProfile, setIsCheckingForProfile] = useState(true);
    const [loadProfileError, setLoadProfileError] = useState(null);

    if (isOrganization) term = "Organization";
    else if (isIntern) term = "Internship";

    let modal;
    const reFetch = ()=>{
        setLoadProfileError(null);
        setIsCheckingForProfile(true);
    }
    
    if (isCheckingForProfile) modal = <Preloader show={true} text={"Loading..."}/>;

    else if (loadProfileError) modal = <ErrorModal show={true} text={loadProfileError} cta={()=>setLoadProfileError(null)}/>

    useEffect(()=>{
        // loadProfile();
        // console.log("Runnin")
        UserAccount.getProfile(auth)
        .then(({ message, data, isComplete})=>{
            // check data and do the needful

            // Get the data, update context.
            updateAccountProfile({
                email: auth.currentUser.providerData[0].email,
                ...data,
                isComplete,
            });

            JSONLog(data);
            if (isComplete) return;

            if (!data.type) {
                return setIsCheckingForProfile(false)
            }; // continue

            // at this point, its regarded as incomplete
            // navigate to createProfile screen
            // Navigate to form screen passing the incomplete profile with it
            
            return navigation.navigate("ProfileForm", {
                title: "Complete profile"
            });
        })
        .catch((errorMessage)=>{
            // Message will be displayed in modal
            // console.log("ErrorM:", errorMessage, typeof errorMessage);
            if ((typeof errorMessage) !== "string") setLoadProfileError("Could not fetch profile");
            else setLoadProfileError(String(errorMessage));

            setIsCheckingForProfile(false);
        })
    },[isCheckingForProfile, loadProfileError])

    return (
        <>
            {modal}

            {/* Top container containing Logo */}
            <View style={styles.top}>
                <Image assetName="logo" assetGroup="assets" width={86} height={43}/>
            </View>

            {/* middle container containing illustration */}
            <View style={styles.middle}>
                <Image assetName="memoji" assetGroup="assets" width={256} height={256}/>
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
                    <Text h1 style={{width:"75%", color: Theme.main}}>
                        <Text>Provide Your </Text>
                        <Text secondary a>{term} </Text>
                        <Text>Information!</Text>
                    </Text>


                    {
                        isIntern && (
                            
                            <Text p style={{width:"75%", color: Theme.accent}}>
                                Explore all the most exciting internship
                                roles based on your study major.
                            </Text>
                        )
                    }
                    
                </View>
                

                <TouchableOpacity 
                    onPress={()=>navigation.navigate("ProfileUserType")} 
                    style={{
                        width:60,
                        height:60,
                        backgroundColor:Theme.main,
                        borderRadius:30,
                        alignItems:'center',
                        justifyContent:'center',
                        alignSelf:'flex-end',
                        marginRight: 30,
                    }}
                >
                    <Image assetName="arrowRight" assetGroup="assets" width={30} height={25}/>
                </TouchableOpacity>
                
            </View>

        </>
    )
}

export default Onboarding;


const styles = StyleSheet.create({
  top: {
    flex: 1,
    paddingTop:80,
    paddingRight:30,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  middle: {
    flex: 3,
    paddingTop:10,
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
