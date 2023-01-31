import React from 'react';
import { TouchableOpacity } from 'react-native';
// import { View, Text } from 'react-native-ui-lib';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../constants/theme';

const HeaderRight = ({type, onPress, light}) => {
    let template;

    if (type === 'settings') template = (
        <MaterialIcons
                name={'cog-outline'} 
                size={25} 
                color={light ? Theme.white: Theme.accent}
                style={{paddingRight: 20}}
            />
    )

    else template = (
        <Octicons 
            name={'bell'} 
            size={25} 
            color={light ? Theme.grey100 : Theme.accent} 
            style={{paddingRight: 20}}
        />
    )
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            {template}
        </TouchableOpacity>
  );
}


export default HeaderRight;