import React from 'react';
import { View, Text } from 'react-native-ui-lib';

const NotFound = ({text}) => {
    return (
        <View flex center>
            <Text>{text || "Job info not found"}</Text>
        </View>
    )
}

export default NotFound;