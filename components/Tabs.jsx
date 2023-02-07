import { TouchableOpacity } from 'react-native';
import { View, Text, } from 'react-native-ui-lib';
import React from 'react';
import Theme from '../constants/theme';


const Tab = ({text, onClick, active})=> (
    <TouchableOpacity
        onPress={onClick}
        activeOpacity={0.6}
        center 
        style={{
            backgroundColor:active ? Theme.secondary : 'transparent',
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginHorizontal: 15,
        }}
    >
        <Text label style={{color: active ? Theme.white : Theme.accent }}>{text}</Text>
    </TouchableOpacity>
)

const Tabs = ({tabs}) => {

    return (
        <>
            <View
                style={{
                    flexDirection:'row', 
                    alignItems:'center', 
                    justifyContent:'space-evenly',
                    backgroundColor:Theme.white,
                    padding: 5,
                    borderRadius: 5,
                    // maxWidth: "80%"
                }}
            >
                {
                    tabs.map(({text, onClick, active})=>(
                        <Tab
                            text={text}
                            onClick={onClick} 
                            active={active}
                        />
                    ))
                }

            </View>
        </>
    )
}

export default Tabs;