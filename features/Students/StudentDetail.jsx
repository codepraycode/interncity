import React from 'react'
import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { JSONLog } from '../../utils';
import { MiniDetailHeader } from '../../components/Headers';
import { StudentInfo } from '../../components/Infos';
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
                        <MiniDetailHeader student={intern?.student || student}/>

                        <StudentInfo showHeader={true} student={intern?.student || student}/>

                        <View style={{marginHorizontal:10, marginVertical:5, borderBottomWidth:1, borderColor:Theme.grey300}}>
                            <Text h6 style={{color: Theme.grey300}}>Placements</Text>
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
