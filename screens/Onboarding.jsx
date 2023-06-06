import React from 'react';
import {View, Text, Image, Colors} from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { useRouter } from "expo-router";
import { screenNames } from '../config/screens';
/* 
    Onboarding screen for new users or after fresh installation
*/

const Onboarding = ()=>{ // onboarding for AuthenticationStackco
    const router = useRouter();

    return (
        <>
            {/* Top container containing Logo */}
            <View style={styles.top}>
                <Image
                    assetName="logo"
                    assetGroup="assets"
                    width={86} height={43}
                />
            </View>

            {/* middle container containing illustration */}
            <View style={styles.middle}>
                <Image
                    assetName="memoji1"
                    assetGroup="assets"
                    width={270}
                    height={270}
                />
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
                    <Text h1 style={{width:"60%"}}>
                        <Text>Find Your </Text>
                        <Text secondary a>Internship</Text>
                        <Text>Here!</Text>
                    </Text>
                </View>
                

                <TouchableOpacity 
                    onPress={()=>router.push(screenNames.signIn)} 
                    style={{
                        width:60, 
                        height:60,
                        backgroundColor:Colors.main,
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
    paddingTop:100,
    paddingRight:30,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  middle: {
    flex: 3,
    paddingTop:20,
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
