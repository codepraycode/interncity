import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Theme from '../../constants/theme';


const settingsSections = [
    {
        icon:'bell',
        label: 'Notifications',
        further: false,
    },
    {
        icon:'lock',
        label: 'Password',
        further: true,
    },
    // {
    //     icon:'lock',
    //     label: 'Password',
    //     further: true,
    // },
    {
        icon:'logout',
        label: 'Logout',
        further: true,
        material: true,
    },
]

const SettignsContent = ({icon, label:text, further, material})=>{
    // A small card probably with a further icon

    return(
        <View center marginV-10>
            <View
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
                        <Octicons name={icon} size={20}/>
                    }
                    

                    <Text h5 style={{marginLeft:20}}>
                        {text}
                    </Text>
                </View>

                {further && <Octicons name={'chevron-right'} size={20}/>}
            </View>
        </View>
    )
}

const AppSettingsScreen = () => {
    return (
        <View style={{
            marginTop: 40,
        }}>
            {
                settingsSections.map((each, i)=>{
                    // const {further, label, icon} = each;

                    return (
                        <SettignsContent {...each}/>
                    )
                })
            }
        </View>
    )
}

export default AppSettingsScreen;

const styles = StyleSheet.create({});