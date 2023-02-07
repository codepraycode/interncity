import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import JobNotFound from '../../states/JobNotFound';

import Octicons from 'react-native-vector-icons/Octicons';
import { useJob } from '../../hooks/useJobs';
import Seperator from '../../components/Seperator';
import DetailHeader, { PlacementHeader } from '../../components/organization/Header';
import Tabs from '../../components/Tabs';
import Info from '../../components/organization/Info';


const PlacementDetail = ({ route }) => {
    const { jobId } = route.params;
    
    const [job] = useJob(jobId);

    const [tabNo, setTabNo] = useState(0);
    const company = {};
    
    return (

        <ScrollView 
            contentContainerStyle={{
                backgroundColor:Theme.grey100,
            }}
        >

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


            {/* Content */}
            <View
                style={{
                    paddingVertical: 10,
                    marginHorizontal: 20,
                }}
            >
                <Info showSite={true}/>
            </View>
                
            
        </ScrollView>

    );
}

export default PlacementDetail;

