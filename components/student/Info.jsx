import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import Theme from '../../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';

const Info = ({showCV}) => {
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

        {showCV && (<View>
            <View
                center
                style={{
                    flexDirection:'row',
                    backgroundColor:Theme.lightRed,
                    maxWidth: "80%",
                    paddingHorizontal: 20,
                    paddingVertical:10,
                    borderRadius: 6,
                    marginVertical: 10,
                }}
            >
                <Octicons name="link-external" size={15} color={Theme.red}/>

                <Text style={{marginLeft: 10, color:Theme.red}}>
                    View CV
                </Text>
            </View>
            
        </View>)}

    </View>
  )
}

export default Info