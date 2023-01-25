import React from 'react'
import { View, Text, Image} from 'react-native-ui-lib';
import { FlatList, StyleSheet } from 'react-native';
import { InternLists } from '../../constants/dummy';
import assets from '../../constants/assets';
import Card from '../../components/Card';



const InternItem = ({data, onViewClick})=>{
    const {firstname, lastname} = data;

    // const name = `${firstname}`

    return (
        <Card>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:5,}}>

                <Image
                    source={assets.user}
                    resizeMode="cover"
                />

                <View style={{marginLeft:20,}}>
                <Text h4>{firstname} {lastname}</Text>
                <Text small>Federal University of Technology Akure</Text>
                </View>
            </View>
        </Card>
    )
}

const InternsListScreen = () => {

    // console.log(dateIntervals);
    return (
        <FlatList
            data={ InternLists }
            renderItem = {({item})=><InternItem data = { item} onViewClick = {()=>{}}/>}
            keyExtractor={item => item.id}
        />
    )
}

export default InternsListScreen;

const styles = StyleSheet.create({});