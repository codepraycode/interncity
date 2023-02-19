import React from 'react';
import { View, Text } from 'react-native-ui-lib';

const NotFound = ({text}) => {
    return (
        <View flex center>
            <Text>{text || "Nothing to show"}</Text>
        </View>
    )
}

export default NotFound;