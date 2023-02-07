import React from 'react'
import { FlatList } from 'react-native';
import { InternLists } from '../../constants/dummy';
import Item from '../../components/student/Item';


const StudentListScreen = ({navigation}) => {

    const handleNavigateToDetail = (internItem)=>{
        navigation.navigate("Student", { 
            screen: "StudentDetail", 
            params: {internId: "fdsfasd"}
        });
    }
    return (
        <FlatList
            data={ InternLists }
            renderItem = {({item})=><Item data={ item } isSupervisor={true} onViewClick={()=>handleNavigateToDetail()}/>}
            keyExtractor={item => item.id}
        />
    )
}

export default StudentListScreen;
 