import React, { useCallback, useContext, useState } from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView  } from 'react-native';
import assets from '../../constants/assets';
import Theme from '../../constants/theme';
import { createAccountSchema, profileInfoSchema } from '../../constants/dummy';
import Form from '../../components/form';
import AppContext from '../../app/context';
import useProfile from '../../hooks/useProfile';
import { UserAccount } from '../../app/models/User';
import { setUpWithPreviousValue } from '../../app/utils';
// import { setStatusBarStyle, StatusBar } from 'expo-status-bar';

const ProfileSettingsHeader = ()=>{
    const {isOrganization} = useContext(AppContext);

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
            center={isOrganization}
                style={{
                    paddingLeft: 0,
                }}
            >

                {/* Image */}
                <View center style={{width: 60, height: 60, borderRadius: 30}}>
                    <Image
                        source={isOrganization ? assets.google : assets.user}
                        // resizeMethod={"auto"}
                        resizeMode="cover"
                    />
                </View>

                {/* Text */}
                <View center ={isOrganization} style={{marginVertical: 10}}>
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


const ProfileSettingScreen = () => {

    const [userProfile, updateProfile] = useProfile();
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    let formSchema = UserAccount.getProfileSchema(userProfile.type);

    const getPreviousValues = useCallback(()=>{
      // process the previous values
      return setUpWithPreviousValue(formSchema, userProfile);
    })


    const handleOnUpdate = (updatedData)=>{
      if (loading) return;

      setLoading(true);
      setFormErrors(()=>({}));

      updateProfile(updatedData)
      .then(()=>{
        setLoading(false);
      })
      .catch((err)=>{
        setFormErrors(()=>err);
        setLoading(false)
      })
    }

    
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
            >   

                <View style={{
                    paddingBottom: 20,
                    paddingHorizontal: 30,
                }}>

                    <Form
                        onSubmit={(data)=> handleOnUpdate(data)}
                        schema={formSchema} 
                        getPreviousValues={getPreviousValues}
                        authLabel={ !loading ? "Update":"Updating..."}
                        errors={formErrors}
                        disable={loading}
                    />
                </View>
            </ScrollView>

        </>
    )
}

export default ProfileSettingScreen;
const styles = StyleSheet.create({});