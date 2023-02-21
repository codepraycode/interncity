import React, { useCallback, useContext, useState } from 'react'
import { View } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground, ScrollView  } from 'react-native';
import assets from '../../constants/assets';
import Form from '../../components/form';
import AppContext from '../../app/context';
import useProfile from '../../hooks/useProfile';
import UserAccount from '../../app/models/User';
import { JSONLog, setUpWithPreviousValue } from '../../app/utils';
import { Preloader } from '../../components/Modal';
import { ImageUpload } from '../../components/form/FileInput';

const ProfileSettingsHeader = ({profile, onChange, schema})=>{
    const { isOrganization, isSupervisor } = useContext(AppContext);

    let align = 'flex-start';
    let profileType = "Student";

    if (isOrganization) {
        align = 'center';
        profileType = "Organization";
    }
    else if (isSupervisor) {
        align = 'flex-end';
        profileType = "Institution Supervisor";
    }


    profile.type = profileType;

    return (
        <ImageBackground 
            source={assets.profileHeaderBg}
            resizeMode = {"contain"}
            style={{
                justifyContent:'center',
                height: 385,
                overflow: 'hidden',
                paddingTop: 15,
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
                <ImageUpload
                    schema={schema}
                    name="avatar"
                    onChange={(name, avatarData)=>onChange(avatarData)}
                    value={profile.avatar}
                    mini = {true}
                    profile={profile}
                    center={isOrganization}
                />
            </View>
        </ImageBackground>
    )
}


const ProfileSettingScreen = () => {

    const [userProfile, updateProfile] = useProfile();
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [updatedAvatar, setUpdatedAvatar] = useState(null);

    let {avatar:avatarSchema, ...formSchema} = UserAccount.getProfileSchema(userProfile.type);

    const getPreviousValues = useCallback(()=>{
      // process the previous values
      return setUpWithPreviousValue(formSchema, userProfile);
    })


    const handleOnUpdate = (updatedData)=>{
      if (loading) return;

      if (updatedAvatar) updatedData.avatar = updatedAvatar;

    //   JSONLog(updatedData);
    

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
        avatar: updatedAvatar || userProfile.avatar
    }
    JSONLog(profile);
    return (
        <>
            {/* Header */}
            <ProfileSettingsHeader profile={profile} onChange={(avatar)=>setUpdatedAvatar(()=>avatar)} schema={avatarSchema}/>
            {/* Form content */}
            <View flex>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 280,
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