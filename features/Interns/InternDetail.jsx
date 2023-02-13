import React, { useState } from 'react'
import { View } from 'react-native-ui-lib';
import Theme from '../../constants/theme';
import { InternLists } from '../../constants/dummy';
import NotFound from '../../states/NotFound';

import { LogBottomSheet } from '../../components/BottomSheet';
import DetailHeader from '../../components/student/Header';
import Tabs from '../../components/Tabs';
import Info from '../../components/student/Info';
import { WeeklyLogs } from '../../components/student/Log';
import { useApplication } from '../../hooks/useApplication';
import { JSONLog } from '../../app/utils';

const InternsDetail = ({ id:internId }) => {
    
    const internData = InternLists.find(each => each.id === (internId));

    const [tabNo, setTabNo] = useState(0);
    const [weekEditing, setWeekEditing] = useState(null);

    const autoSaveLog = (data)=> setWeekEditing(null);

    if (!Boolean(internData)) return <NotFound  text="Could not retrieve data"/>;

    const log = `Date: 1/1/2023

A sample weekly log.

supervisor: Mr Lorem Bulaba (Manager)
`

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
                <Info showCV={true}/>
                :
                <WeeklyLogs onEditLog={(weekNumber)=>setWeekEditing(weekNumber)}/>
            }

            <LogBottomSheet 
                weekly={true} 
                show={Boolean(weekEditing)} 
                data={log} 
                onDismiss={autoSaveLog}
            />
        </>

    );
}

const ApplicationDetail = ({ id:applicationId }) => {
    
    const internData = InternLists.find(each => each.id === (applicationId));
    const {data:application} = useApplication(applicationId);

    console.log("Application id:", applicationId)
    JSONLog(application); // stoped here!

    if (!Boolean(internData)) return <NotFound  text="Could not retrieve data"/>;

    return (
        <>
            <View 
                contentContainerStyle={{
                    backgroundColor:Theme.grey100,
                }}
            >

                <DetailHeader data = { internData }/>
            </View>

            {/* Content */}
            <Info showCV={true}/>
        </>

    );
}

const InternsDetailScreen = ({ route }) => {
    const { internId, applicationId } = route.params;

    if (applicationId) return <ApplicationDetail id={applicationId}/>
    return <InternsDetail id={internId}/>;
}


export default InternsDetailScreen;
