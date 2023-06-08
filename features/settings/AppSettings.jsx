import React, { useState } from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, TouchableOpacity } from 'react-native';
// import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Theme from '../../constants/theme';
import BottomSheet from '../../components/BottomSheet';
import { auth } from '../../config/firebase';


const settingsSections = [
    {
        icon:'bell',
        label: 'Notifications',
        further: false,
        navigate:'Notification',
    },
    {
        icon:'lock',
        label: 'Password',
        further: true,
        navigate: 'settingUpdatePassword',
    },
    {
        icon:'logout',
        label: 'Logout',
        further: true,
        material: true,
        logout:true
    },
]

const SettignsContent = ({icon, label:text, further, material, onClick})=>{
    // A small card probably with a further icon

    return(
        <View center marginV-10>
            <TouchableOpacity 
                activeOpacity={0.6}
                onPress={onClick}
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    backgroundColor:Theme.white,
                    width: '90%',
                    paddingVertical:15,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    elevation: 2,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                    }}
                >
                    {/* Icon */}
                    {
                        material ?
                        <MaterialIcons name={icon} size={20}/>
                        :
                        {/* <Octicons name={icon} size={20}/> */}
                    }
                    

                    <Text h5 style={{marginLeft:20}}>
                        {text}
                    </Text>
                </View>

                {/* {further && <Octicons name={'chevron-right'} size={20}/>} */}
            </TouchableOpacity>
        </View>
    )
}

const AppSettingsScreen = ({navigation}) => {

    const navigateOut = (screenName)=>{
        navigation.navigate(screenName);
    }

    const [logginOut, setLoggingOut] = useState(false);

    return (
        <View style={{
            marginTop: 40,
        }}>
            {
                settingsSections.map((each, i)=>{
                    const {navigate, logout} = each;

                    return (
                        <SettignsContent {...each} key={i} onClick={()=>{
                            if (navigate) return navigateOut(navigate);
                            if (logout) setLoggingOut(true);
                        }}/>
                    )
                })
            }


            <BottomSheet 
                show={logginOut}
                signOut={()=> auth.signOut()}
                onDismiss={()=> setLoggingOut(false)}
                authOut={true}
            />
        </View>
    )
}

export default AppSettingsScreen;

const styles = StyleSheet.create({});