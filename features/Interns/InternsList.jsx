import React from 'react'
import { FlatList } from 'react-native';
import Item from '../../components/student/Item';
import { useInterns } from '../../hooks/useIntern';
import NoStudents from '../../states/NoStudents';

const InternsListScreen = ({navigation}) => {

    const {interns} = useInterns();

    const handleNavigateToDetail = (internItem)=>{
        navigation.navigate("Intern", { 
            screen: "InternDetail", 
            params: {internId: internItem.id}
        });
    }


    return (
        <FlatList
            data={ interns }
            renderItem = {({item})=>(
                <Item 
                    data = { item } 
                    onViewClick = {()=>handleNavigateToDetail(item)}
                />)
            }
            keyExtractor={item => item.id}
            ListEmptyComponent={(
                <NoStudents isOrganization={true}/>
            )}
        />
    )
}

export default InternsListScreen;