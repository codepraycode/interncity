import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import ApplicationDetail from './Application';
import { useIntern } from '../../hooks/useIntern';
import Tabs from '../../components/Tabs';
import WeeklyLogs from '../../components/organization/WeeklyLogs';
import {LogBottomSheet} from '../../components/BottomSheet';
import NotFound from '../../states/NotFound';
import AppContext from '../../app/context';
import { MiniDetailHeader2 } from '../../components/Headers';
import { PlacementDetailInfo, StudentInfo } from '../../components/Infos';

const InternsDetailScreen = ({ route }) => {
    const { internId, applicationId } = route.params;

    if (applicationId) return <ApplicationDetail id={applicationId}/>

    const {isSupervisor, isIntern} = useContext(AppContext)
    
    const { intern, saveLog } = useIntern(internId);
    const [tabNo, setTabNo] = useState(0);    
    const [logEditing, setLogEditing] = useState(null);

    const autoSaveLog = (data=null)=> {
        // console.log(data);
        if(data?.log){
            // Save data
            saveLog(data)
            .then(()=>console.log("Done!"))
            .catch(err=>console.log("Error:", err))
        }

        setLogEditing(null);
    };

    if (!Boolean(intern.original)) return <NotFound  text="Could not retrieve data"/>;

    const Info = (
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
            <StudentInfo showHeader isIntern={isIntern} student={intern?.student}/>

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
            <MiniDetailHeader2 student={intern.student} school={intern.student?.schoolData}/>
        
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
                        onEditLog={(logData)=>setLogEditing(logData)}
                        internId ={intern.id}
                    />

                    <LogBottomSheet
                        weekly={true} 
                        show={Boolean(logEditing)} 
                        data={logEditing}
                        onDismiss={autoSaveLog}
                        editable={!isSupervisor}
                    />
                </>
            }

            
        </>
    )
}


export default InternsDetailScreen;
