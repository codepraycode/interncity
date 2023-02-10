import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import Theme from '../../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';

const Info = ({showSite}) => {
  return (
    <View
        style={{            
            marginHorizontal: 10,
        }}
    >
        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Organization name</Text>

            <Text h6>
                Google inc.
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>About organization</Text>

            <Text h6 style={{marginVertical: 0}}>
                A technology company
            </Text>
        </View>

        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 10}}>Address</Text>

            <Text h6 style={{marginVertical: 0}}>
                Ikeja Lagos, Nigeria.
            </Text>
        </View>

        {
            showSite && (
                <View>
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
                            Visit website
                        </Text>
                    </View>
                    
                </View>
            )
        }

    </View>
  )
}

export const PlacementDetailInfo = () => {
  return (
    <View
        style={{            
            marginHorizontal: 10,
        }}
    >
        <View style={{marginVertical: 10}}>
            <Text p>Job role</Text>

            <Text h5 style={{marginVertical: 5}}>
                Backend Intern
            </Text>
        </View>

        <View >
            <Text p style={{marginVertical: 5}}>
                Stipend
            </Text>

            <Text h5>
                40,000/month.
            </Text>
        </View>


        <View style={{marginVertical: 10}}>
            <Text p style={{marginVertical: 5}}>
                Location
            </Text>

            <Text h5>
                Ikeja, Lagos.
            </Text>
        </View>

        <View>
            <Text p style={{marginVertical: 5}}>
                Duration
            </Text>

            <Text h5>
                4 months.
            </Text>
        </View>

    </View>
  )
}

export default Info