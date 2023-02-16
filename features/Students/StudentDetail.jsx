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
import NotFound from '../../states/NotFound';

const StudentDetailScreen = ({ navigation, route }) => {

    const { student } = route.params;

    const { intern } = useStudent(student);

    if (!Boolean(intern)) return <NotFound text={"Could not retrieve data"}/>;

    const { placements } = usePlacements(intern.student.id);

    const handleNavToPlacement = ()=>{
        navigation.navigate("Student", { 
            screen: "StudentPlacementDetail", 
            params: {jobId: 2}
        });
    }

    return (
        <>
           

            <FlatList
                data={placements}
                renderItem = {({item})=>(
                    <PlacementItem
                        onView={()=>handleNavToPlacement()}
                        placement={item}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <StudentDetailHeaderMini student={intern.student}/>

                        <ApplicationStudentInfo showHeader={true} student={intern.student}/>

                        <View style={{marginHorizontal:20, marginBottom:5, borderTopWidth:1, borderColor:Theme.grey300}}>
                            <Text h5>Placements</Text>
                        </View>
                        
                    </View>
                }
            />
            
        </>

    );
}

export default StudentDetailScreen;
