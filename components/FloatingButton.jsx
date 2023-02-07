import React from 'react'
import { TouchableOpacity } from 'react-native'
import Theme from '../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import { boxShadow } from '../constants/typography';

const FloatingButton = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                position:'absolute',
                bottom:15,
                right:15,
                width:60,
                height: 60,
                borderRadius: 30,
                backgroundColor:Theme.accent,
                alignItems:'center',
                justifyContent:'center',
                ...boxShadow
            }}
            onPress={onPress}
        >
            <Octicons name={'plus'} size={30} color={Theme.white} />
        </TouchableOpacity>
    )
}

export default FloatingButton;
