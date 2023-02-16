import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import { PlacementHeader } from '../../components/organization/Header';
import Tabs from '../../components/Tabs';
import Info, { CompanyInfo, PlacementDetailInfo } from '../../components/organization/Info';
import WeeklyLogs from '../../components/organization/WeeklyLogs';
import Theme from '../../constants/theme';
import InternDailyLogLists from '../Interns/InternDailyLogsList';
import { StudentDetailHeaderMini } from '../../components/student/Header';
import { useJob } from '../../hooks/useJobs';


const PlacementDetail = ({ route }) => {
    const { placement, student } = route.params;
    const { job } = useJob(placement.job);
    const [tabNo, setTabNo] = useState(0);
    let content;

    if (tabNo === 0) content = (
        <ScrollView>

            <PlacementDetailInfo
                showHeader={true}
                job={job}
                date_applied={placement.date_applied}
                duration={placement.duration}
            />

            <View style={{marginHorizontal:10, marginTop:20, borderBottomWidth:1, borderColor:Theme.grey300}}>
                <Text h6 style={{color: Theme.grey300}}>Organization</Text>
            </View>

            <CompanyInfo company={job.company}/>
        </ScrollView>
    );
    if (tabNo === 1) content = <WeeklyLogs onEditLog={()=>{}} internId={placement.student}/>;
    if (tabNo === 2) content = <InternDailyLogLists placement={placement}/>;
    
    return (

        <>
            <StudentDetailHeaderMini
                student={student}
                job={job}
            />

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

