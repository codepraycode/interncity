import React from 'react'
import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { JSONLog } from '../../app/utils';
import { ApplicationStudentInfo } from '../../components/organization/Info';
import { StudentDetailHeaderMini } from '../../components/student/Header';
import PlacementItem from '../../components/student/Placements';
import Theme from '../../constants/theme';
import { usePlacements } from '../../hooks/useApplication';
import { useStudent } from '../../hooks/useIntern';
import NoPlacement from '../../states/NoPlacement';

const StudentDetailScreen = ({ navigation, route }) => {

    const { student } = route.params;

    const { intern } = useStudent(student);

    const { placements } = usePlacements(intern?.student.id);

    const handleNavToPlacement = (placement)=>{
        navigation.navigate("Student", { 
            screen: "StudentPlacementDetail", 
            params: { placement, student }
        });
    }

    return (
        <>
           

            <FlatList
                data={placements}
                renderItem = {({item})=>(
                    <PlacementItem
                        onView={()=>handleNavToPlacement(item)}
                        placement={item}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <StudentDetailHeaderMini student={intern?.student || student}/>

                        <ApplicationStudentInfo showHeader={true} student={intern?.student || student}/>

                        <View style={{marginHorizontal:20, marginBottom:5, borderTopWidth:1, borderColor:Theme.grey300}}>
                            <Text h5>Placements</Text>
                        </View>
                        
                    </View>
                }
                ListEmptyComponent={(
                    <NoPlacement/>
                )}
            />
            
        </>

    );
}

export default StudentDetailScreen;
