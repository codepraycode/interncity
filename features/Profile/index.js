import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground, Image, TouchableOpacity  } from 'react-native';
import assets from '../../constants/assets';
import Theme from '../../constants/theme';
// import { setStatusBarStyle, StatusBar } from 'expo-status-bar';

const ProfileScreen = () => {

    // setStatusBarStyle('dark');
    
    return (
        <>
            
            
            <View flex>
                
                {/* Header */}
                <ImageBackground 
                    source={assets.profileHeaderBg}
                    resizeMode = {"contain"}
                    style={{
                        justifyContent:'center',
                        minHeight: 380,
                        overflow: 'hidden',
                        paddingTop: 10,
                    }}
                    imageStyle={{
                        resizeMode:'stretch'
                    }}
                >
                    {/* Container */}
                    <View
                        style={{
                            paddingLeft: 25,
                        }}
                    >

                        {/* Image */}
                        <View center style={{width: 60, height: 60, borderRadius: 30}}>
                            <Image
                                source={assets.user}
                                // resizeMethod={"auto"}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Text */}
                        <View style={{marginVertical: 10}}>
                            <Text h4 style={{color: Theme.grey100}}>Orland orlando</Text>
                            <Text small style={{color: Theme.grey100}}>Califonia USA</Text>
                        </View>

                        {/* Button to change Image */}
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={{
                                backgroundColor: "rgba(255, 255, 255, .2)",
                                alignItems:'center',
                                width: 130,
                                paddingVertical: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Text p style={{color: Theme.grey100, fontSize: 13}}>Change image</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>


                {/* Form content */}
                <View>

                </View>

                {/* Call to action */}
                <View>

                </View>
            </View>

            {/* <StatusBar style="light" /> */}
        </>
    )
}

export default ProfileScreen;
const styles = StyleSheet.create({});