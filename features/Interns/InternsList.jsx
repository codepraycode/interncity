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
                    student = { item } 
                    onViewClick = {()=>handleNavigateToDetail(item)}
                    isSupervisor={false}
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