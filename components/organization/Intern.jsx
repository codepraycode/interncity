import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import { InternLists } from '../../constants/dummy';
import Theme from '../../constants/theme';
import NotFound from '../../states/NotFound';
import { LogBottomSheet } from '../BottomSheet';
import Tabs from '../Tabs';
import { InternDetailHeader } from './Header';
import { InternInfo } from './Info';
import WeeklyLogs from './WeeklyLogs';


const InternDetail = ({ id:internId }) => {
    
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

                <InternDetailHeader data = { internData }/>

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
                <InternInfo showCV={true}/>
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

export default InternDetail;