import { View, Text, Image } from 'react-native-ui-lib';
import React from 'react'
import Card from '../Card';
import assets from '../../constants/assets';
import Seperator from '../Seperator';

const Item = ({data, onViewClick}) => {
    const {firstname, lastname} = data;

    return (
        <Card clickable={true} onPress={onViewClick}>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:5,}}>

                <Image
                    source={assets.user}
                    resizeMode="cover"
                />

                <View style={{marginLeft:20,}}>
                <Text h4>{firstname} {lastname}</Text>
                <View style={{flexDirection:'row', 'alignItems':'center'}}>
                    <Text small>FUTA</Text>
                    <Seperator/>
                    <Text small>Cyber security</Text>
                </View>
                </View>
            </View>
        </Card>
    )
}

export default Item;