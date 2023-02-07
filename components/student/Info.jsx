import { View, Text } from 'react-native-ui-lib';
import React from 'react'

const Info = () => {
  return (
    <View
        style={{
            paddingVertical: 10,
            marginHorizontal: 30,
        }}
    >
        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Phone number</Text>

            <Text h6>
                +234 8000000000
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Address</Text>

            <Text h6 style={{marginVertical: 0}}>
                Ota, Lagos.
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Department</Text>

            <Text h6 style={{marginVertical: 0}}>
                Cyber security
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>School</Text>

            <Text h6 style={{marginVertical: 0}}>
                Federal University of Technology Akure
            </Text>
        </View>

    </View>
  )
}

export default Info