import React, { useCallback, useContext, useState } from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView  } from 'react-native';
import assets from '../../constants/assets';
import Theme from '../../constants/theme';
import Form from '../../components/form';
import AppContext from '../../app/context';
import useProfile from '../../hooks/useProfile';
import { UserAccount } from '../../app/models/User';
import { setUpWithPreviousValue } from '../../app/utils';
import { Preloader } from '../../components/Modal';

const ProfileSettingsHeader = ({profile})=>{
    const { isOrganization, isSupervisor } = useContext(AppContext);

    let align = 'flex-start';

    if (isOrganization) align = 'center';
    else if (isSupervisor) align = 'flex-end';

    return (
        <ImageBackground 
            source={assets.profileHeaderBg}
            resizeMode = {"contain"}
            style={{
                justifyContent:'center',
                height: 380,
                overflow: 'hidden',
                paddingTop: 10,
                paddingLeft: 5,
                position:'absolute',
                width:'101%',
                // zIndex:1
            }}
            imageStyle={{
                resizeMode:'stretch'
            }}
        >
            {/* Container */}
            <View
                // center
                style={{
                    marginHorizontal: 10,
                    // backgroundColor:'red',
                    alignItems: align,
                    width: "90%"
                }}
            >
                <View center>
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
                        <Text h4 center style={{color: Theme.grey100}}>{profile.name}</Text>
                        <Text small center style={{color: Theme.grey100}}>{profile.type}</Text>
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

    const accType = String(userProfile.type || 'user')
    const profile ={
        name: userProfile.name || userProfile.fullname,
        type: accType,
    }
    //  console.log(loading, formErrors)
    return (
        <>
            {/* Header */}
            <ProfileSettingsHeader profile={profile}/>
            {/* Form content */}
            <View flex>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 300,
                    }}
                    centerContent={true}
                    style={{
                        zIndex:-1,
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
                            authLabel={ !loading ? "Update profile":"Updating..."}
                            errors={formErrors}
                            disable={loading}
                        />
                    </View>
                </ScrollView>
            </View>

            <Preloader show={loading} text="Updating profile..."/>
        </>
    )
}

export default ProfileSettingScreen;
const styles = StyleSheet.create({});