import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import { PlacementHeader } from '../../components/organization/Header';
import Tabs from '../../components/Tabs';
import Info, { PlacementDetailInfo } from '../../components/organization/Info';
import WeeklyLogs from '../../components/organization/WeeklyLogs';
import Theme from '../../constants/theme';
import InternDailyLogLists from '../Interns/InternDailyLogsList';


const PlacementDetail = () => {
    // const { jobId } = route.params;
    const [tabNo, setTabNo] = useState(0);
    let content;

    if (tabNo === 0) content = (
        <ScrollView 
            contentContainerStyle={{
                // backgroundColor:Theme.grey100,
                marginHorizontal: 20,
            }}
        >

            <PlacementDetailInfo/>

            <View style={{marginHorizontal:10, marginTop:20, borderBottomWidth:1, borderColor:Theme.grey300}}>
                <Text h6 style={{color: Theme.grey300}}>Organization</Text>
            </View>
            <Info showSite={true}/>
        </ScrollView>
    );
    if (tabNo === 1) content = <WeeklyLogs/>;
    if (tabNo === 2) content = <InternDailyLogLists/>;
    
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

