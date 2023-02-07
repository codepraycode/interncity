import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';

import { useJob } from '../../hooks/useJobs';
import { PlacementHeader } from '../../components/organization/Header';
import Tabs from '../../components/Tabs';
import Info from '../../components/organization/Info';
import { WeeklyLogs } from '../../components/student/Log';


const PlacementDetail = ({ route }) => {
    const { jobId } = route.params;
    
    const [job] = useJob(jobId);

    const [tabNo, setTabNo] = useState(0);
    const company = {};

    let content;


    if (tabNo === 0) content = (
        <ScrollView 
            contentContainerStyle={{
                // backgroundColor:Theme.grey100,
                marginHorizontal: 20,
            }}
        >            
            <Info showSite={true}/>    
        </ScrollView>
    );
    if (tabNo === 1) content = <WeeklyLogs/>;
    if (tabNo === 2) content = <WeeklyLogs/>;
    
    return (

        <>
            <PlacementHeader/>
            {/* Tabs */}
            <View centerH style={{marginVertical:20,}}>
                <Tabs
                    tabs={[
                        {
                            text: "About",
                            onClick:()=>setTabNo(0),
                            active: tabNo === 0
                        },
                        {
                            text: "Weekly logs",
                            onClick:()=>setTabNo(1),
                            active: tabNo === 1
                        },
                        {
                            text: "Daily logs",
                            onClick:()=>setTabNo(2),
                            active: tabNo === 2
                        }
                    ]}
                />
            </View>

            {content}
            
        </>


    );
}

export default PlacementDetail;

