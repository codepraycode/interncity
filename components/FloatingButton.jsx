import React from 'react'
import { TouchableOpacity } from 'react-native'
import Theme from '../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';

const FloatingButton = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                position:'absolute',
                bottom:10,
                right:5,
                width:60,
                height: 60,
                borderRadius: 30,
                backgroundColor:Theme.accent,
                alignItems:'center',
                justifyContent:'center'
            }}
            onPress={onPress}
        >
            <Octicons name={'plus'} size={30} color={Theme.white} />
        </TouchableOpacity>
    )
}

export default FloatingButton;
