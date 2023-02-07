import React, { useState } from 'react'
import { View } from 'react-native-ui-lib';
import Theme from '../../constants/theme';
import { InternLists } from '../../constants/dummy';
import JobNotFound from '../../states/JobNotFound';

import InternWeekelyReview from './InternWeeklyReview';
import { LogBottomSheet } from '../../components/BottomSheet';
import Tabs from '../../components/Tabs';
import DetailHeader from '../../components/student/Detail';
import Info from '../../components/student/Info';


const StudentDetailScreen = ({ route }) => {
    const { internId} = route.params;
    const internData = InternLists.find(each => each.id === internId);

    const [tabNo, setTabNo] = useState(0);    
    const [weekEditing, setWeekEditing] = useState(null);


    const autoSaveLog = (data)=>{

        setWeekEditing(null);
    }

    if (!Boolean(internData)) return <JobNotFound/>;

    return (
        <>
            <View 
                contentContainerStyle={{
                    backgroundColor:Theme.grey100,
                }}
            >

                <DetailHeader data = { internData }/>

                {/* Tabs */}
                <View 
                    centerH
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Tabs 
                        tabs={[
                            {
                                text: "Intern Info",
                                onClick:()=>setTabNo(0),
                                active: tabNo === 0
                            },
                            {
                                text: "Weekly Reviews",
                                onClick:()=>setTabNo(1),
                                active: tabNo === 1
                            }
                        ]}
                    />
                </View>
            </View>

            {/* Content */}
                
            {
                tabNo === 0 ? 
                <Info/>
                :
                <InternWeekelyReview onEditLog={(weekNumber)=>setWeekEditing(weekNumber)}/>
            }

            <LogBottomSheet weekly={true} show={Boolean(weekEditing)} data={weekEditing} onDismiss={autoSaveLog}/>
        </>

    );
}

export default StudentDetailScreen;
