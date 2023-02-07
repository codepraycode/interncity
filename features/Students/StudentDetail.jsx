import React, { useState } from 'react'
import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { DetailHeaderMini } from '../../components/student/Header';
import Info from '../../components/student/Info';
import PlacementItem from '../../components/student/Placements';
import { InternLists } from '../../constants/dummy';
import Theme from '../../constants/theme';
import JobNotFound from '../../states/JobNotFound';


const StudentDetailScreen = ({ route }) => {
    const { studentId } = route.params;
    const studentData = InternLists.find(each => each.id === studentId);

    const [tabNo, setTabNo] = useState(0);

    if (!Boolean(studentData)) return <JobNotFound/>;

    const log = `Date: 1/1/2023

A sample weekly log.

supervisor: Mr Lorem Bulaba (Manager)
`
    const numberOfWeeks = 3;

    const weeks = [...Array(numberOfWeeks).keys()];

    return (
        <>
           

            <FlatList
                data={weeks}
                renderItem = {({item})=>(
                    <PlacementItem
                        onView={()=>{}}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <DetailHeaderMini data = {studentData}/>

                        <Info showCV={true}/>

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
