import React from 'react';
import {View, Text, Image, Icon, Colors} from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity} from 'react-native';

/* 
    Onboarding screen for new users or after fresh installation
*/

const AppOnboard = ()=>{
    return (
        <>
            {/* Top container containing Logo */}
            <View style={styles.top}>
                <Image assetName="logo" assetGroup="assets" width={86} height={43}/>
            </View>

            {/* middle container containing illustration */}
            <View style={styles.middle}>
                <Image assetName="memoji1" assetGroup="assets" width={270} height={270}/>
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
                        <Text secondary>Internship</Text>
                        <Text>Here!</Text>
                    </Text>
                </View>
                

                <TouchableOpacity 
                    onPressed={()=>{}} 
                    style={{
                        width:60, 
                        height:60,
                        backgroundColor:Colors.$backgroundDark,
                        borderRadius:30,
                        alignItems:'center',
                        justifyContent:'center',
                        alignSelf:'flex-end',
                        marginRight: 30,
                    }}
                >
                    <Icon assetName="arrowRight" assetGroup="assets" size={30}/>
                </TouchableOpacity>
                
            </View>
        </>
    )
}

export default AppOnboard;


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
