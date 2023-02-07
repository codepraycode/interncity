import { View, Text, Image } from 'react-native-ui-lib';
import React from 'react'
import { weeksBetween } from '../../app/utils';

import { FlatList, TouchableOpacity } from 'react-native';
import Theme from '../../constants/theme';
import Card from '../Card';


const PlacementItem = ({onView}) => {

    const breakLength = 178;
    
    return (
        <Card clickable={true} onPress={onView}>
            
            <View style={{flexDirection:'row', marginBottom:20, marginTop:10, alignItems:'center'}}>
                <Image 
                    assetName={"google"}
                    assetGroup="assets" 
                    width={35} height={35}
                    style={{
                        marginRight: 20,
                    }}
                />

                <View style={{width: "80%"}}>
                    
                    <Text h5>Backend Engineer Intern</Text>
                    
                    <Text small
                        style={{
                            marginTop: 5,
                        }}
                    >Google inc.</Text>
                </View>
            </View>

            {/* <Tags tags={sectors}/> */}

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>23/1/2023 - present | 3 months</Text>
            </View>
        </Card>
    )
}


export default PlacementItem;