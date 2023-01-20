import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView  } from 'react-native';
import assets from '../../constants/assets';
import Theme from '../../constants/theme';
import { createAccountSchema, profileInfoSchema } from '../../constants/dummy';
import Form from '../../components/form';
// import { setStatusBarStyle, StatusBar } from 'expo-status-bar';

const ProfileSettingsHeader = ()=>{
    return (
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
    )
}


const ProfileScreen = () => {

    // setStatusBarStyle('dark');
    
    return (
        <>
            {/* Header */}
            <ProfileSettingsHeader/>
            {/* Form content */}
            <ScrollView
                contentContainerStyle={{
                                        
                }}
                centerContent={true}
                style={{
                    // backgroundColor:'red',
                    // flex:1,
                    margin:0,
                    position: 'relative',
                    top: -80,
                    minHeight:'60%',
                }}
                // StickyHeaderComponent={undefined}
                // stickyHeaderIndices={[0]}
                // stickyHeaderHiddenOnScroll={true}
            >   

                <View style={{
                    paddingBottom: 20,
                    paddingHorizontal: 30,
                }}>
                    <Form
                        onSubmit={()=>{}} 
                        schema={{...createAccountSchema,...profileInfoSchema}} 
                        authLabel={"Update"}
                    />
                </View>
            </ScrollView>

        </>
    )
}

export default ProfileScreen;
const styles = StyleSheet.create({});