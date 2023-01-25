import { View, Text, } from 'react-native-ui-lib';
import React from 'react'

const InternInfo = () => {
  return (
        <View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>Phone number</Text>

                <Text p>
                    +234 8000000000
                </Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>Address</Text>

                <Text p style={{marginVertical: 0}}>
                    Ota, Lagos.
                </Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>Department</Text>

                <Text p style={{marginVertical: 0}}>
                    Cyber security
                </Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>School</Text>

                <Text p style={{marginVertical: 0}}>
                    Federal University of Technology Akure
                </Text>
            </View>

        </View>
    )
}

export default InternInfo