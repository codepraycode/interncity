import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { InternLists } from '../../constants/dummy';
import Item from '../../components/student/Item';

const InternsListScreen = ({navigation}) => {

    const handleNavigateToDetail = (internItem)=>{
        navigation.navigate("Intern", { 
            screen: "InternDetail", 
            params: {internId: internItem.id}
        });
    }
    return (
        <FlatList
            data={ InternLists }
            renderItem = {({item})=><Item data = { item} onViewClick = {()=>handleNavigateToDetail(item)}/>}
            keyExtractor={item => item.id}
        />
    )
}

export default InternsListScreen;

const styles = StyleSheet.create({});