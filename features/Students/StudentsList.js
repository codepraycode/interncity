import React, { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import { InternLists } from '../../constants/dummy';
import Item from '../../components/student/Item';
import Student from '../../app/models/Student';
import AppContext from '../../app/context';


const StudentListScreen = ({navigation}) => {

    const {userProfile} = useContext(AppContext);
    const [students, setStudents] = useState(null);

    useEffect(()=>{
        const loadStudents = async ()=>{
            const {id, school, department} = userProfile;
            const res = await Student.getSupervisorStudents(school, department);

            setStudents(()=>res);
        }

        loadStudents();
    }, [userProfile])

    const handleNavigateToDetail = (studentItem)=>{
        navigation.navigate("Student", { 
            screen: "StudentDetail", 
            params: {student: studentItem}
        });
    }
    return (
        <FlatList
            data={ students || [] }
            refreshing={students === null}
            onRefresh={()=>{}}
            renderItem = {({item})=><Item 
                isSupervisor={true} 
                intern = { item } 
                onViewClick = {()=>handleNavigateToDetail(item)}
            />}
            keyExtractor={item => item.id}
        />
    )
}

export default StudentListScreen;
 