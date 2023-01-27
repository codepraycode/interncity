import React from 'react'
import { View, Text, Image} from 'react-native-ui-lib';
import { FlatList, StyleSheet } from 'react-native';
import { InternLists } from '../../constants/dummy';
import assets from '../../constants/assets';
import Card from '../../components/Card';



const StudentItem = ({data, onViewClick})=>{
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
                <Text small>Federal University of Technology Akure</Text>
                </View>
            </View>
        </Card>
    )
}

const StudentListScreen = ({navigation}) => {

    const handleNavigateToDetail = (internItem)=>{
        // navigation.navigate("Intern", { 
        //     screen: "InternDetail", 
        //     params: {internId: internItem.id}
        // });
    }
    return (
        <FlatList
            data={ InternLists }
            renderItem = {({item})=><StudentItem data = { item} onViewClick = {()=>handleNavigateToDetail(item)}/>}
            keyExtractor={item => item.id}
        />
    )
}

export default StudentListScreen;

const styles = StyleSheet.create({});