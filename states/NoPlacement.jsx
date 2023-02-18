import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const NoPlacement = ({title, message}) => {
    return (
        <View 
            center 
            style={{
                height:250,
            }}
        >
            <Text h3 style={{color:Theme.grey400, marginBottom:10,}}>
                {
                    title ||
                    "No placement yet"
                }
            </Text>
            <Text p center style={{width: 250}}>

                <Text>
                    { message }
                </Text>
            </Text>
        </View>
    )
}

export default NoPlacement;
