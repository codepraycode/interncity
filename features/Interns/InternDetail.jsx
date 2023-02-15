import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import ApplicationDetail from '../../components/organization/Application';
import { InternDetailHeader } from '../../components/organization/Header';
import { PlacementDetailInfo, InternInfo } from '../../components/organization/Info';
import { useIntern } from '../../hooks/useIntern';
import Tabs from '../../components/Tabs';
import WeeklyLogs from '../../components/organization/WeeklyLogs';
import {LogBottomSheet} from '../../components/BottomSheet';

const InternsDetailScreen = ({ route }) => {
    const { internId, applicationId } = route.params;

    const {intern} = useIntern(internId);
    const [tabNo, setTabNo] = useState(0);    
    const [weekEditing, setWeekEditing] = useState(null);

    const autoSaveLog = (data)=> setWeekEditing(null);

    if (!Boolean(intern.original)) return <NotFound  text="Could not retrieve data"/>;

    const log = `Date: 1/1/2023
A sample weekly log.
supervisor: Mr Lorem Bulaba (Manager)
`


    if (applicationId) return <ApplicationDetail id={applicationId}/>

    const Info = (
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
            <InternInfo cv={intern.cv} showHeader={true}/>

            <PlacementDetailInfo
                showHeader={true}
                job={intern.job}
                date_applied={intern.date_applied}
                duration={intern.duration}
            />
        </ScrollView>
    )

    return (
        <>
            <InternDetailHeader student={intern.student} school={intern.student?.schoolData}/>
        
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

            {
                tabNo === 0 ? 
                Info
                :
                <>
                    <WeeklyLogs 
                        onEditLog={(weekNumber)=>setWeekEditing(weekNumber)}
                        internId ={intern.id}
                    />

                    <LogBottomSheet
                        weekly={true} 
                        show={Boolean(weekEditing)} 
                        data={log} 
                        onDismiss={autoSaveLog}
                    />
                </>
            }

            
        </>
    )
}


export default InternsDetailScreen;
