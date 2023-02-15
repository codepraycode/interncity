import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import NotFound from '../../states/NotFound';

import Octicons from 'react-native-vector-icons/Octicons';
import { useJob } from '../../hooks/useJobs';
import Seperator from '../../components/Seperator';
import { JobDetailHeader } from '../../components/organization/Header';
import Tabs from '../../components/Tabs';
import { CompanyInfo, PlacementDetailInfo } from '../../components/organization/Info';
import { DurationPicker } from '../../components/form/FormComponents';


const JobInfomation = ({job}) =>{

    return(
        <View>

            <View style={{marginVertical: 10}}>

                <Text p style={{marginVertical: 10}}>Job role</Text>

                <Text h4 style={{marginVertical: 5}}>
                    {job.role}
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 5}}>
                    Pay
                </Text>

                {job.stipend && <Text h4>
                        {job.stipend}
                    </Text>}
                
            </View>

            <View style={{marginVertical: 10}}>
                <Text p style={{marginVertical: 5}}>
                    Location
                </Text>

                <Text h4>
                    {job.location.city}, {job.location.state}
                </Text>
            </View>

        </View>
    )
}

const Tab = ({text, onClick, active})=> (
    <TouchableOpacity 
        onPress={onClick}
        center 
        activeOpacity={0.8}
        style={{
            backgroundColor:active ? Theme.secondary : 'transparent',
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginHorizontal: 15,
        }}
    >
        <Text label style={{color: active ? Theme.white : Theme.accent }}>{text}</Text>
    </TouchableOpacity>
)

const JobDetail = ({ route }) => {
    const { jobId } = route.params;
    
    const { job } = useJob(jobId);

    const [tabNo, setTabNo] = useState(0);
    const [showModal, setShowModal] = useState(false);

    if (!Boolean(job.original)) return <NotFound/>;

    const company = job.company;
    
    if (!Boolean(company)) return <NotFound text={"Job company not found!"}/>;

    return (

        <ScrollView 
            contentContainerStyle={{
                backgroundColor:Theme.grey100,
            }}
        >

            <JobDetailHeader company={company} job={job}/>

            <View
                centerH
                style={{
                    marginBottom: 10,
                }}
            >
                <Tabs
                    tabs={[
                        {
                            text: "Job Info",
                            onClick:()=>setTabNo(1),
                            active: tabNo === 1
                        },
                        {
                            text: "Company Info",
                            onClick:()=>setTabNo(0),
                            active: tabNo === 0
                        }
                    ]}
                />
            </View>

            {
                tabNo === 0 ? 
                <CompanyInfo company={company}/>
                :
                <PlacementDetailInfo job={job} mini/>
            }


            <View center style={{flexDirection:'row', marginVertical:20,}}>
                <DurationPicker/>

                {/* Call to action style={{marginTop:40}}*/}
                <Button 
                    text="Apply Now" 
                    onPress={()=>setShowModal(p=>!p)}
                    style={{
                        width: 180,
                        marginLeft:20,
                    }}
                />
            </View>
        
        </ScrollView>

    );
}

export default JobDetail;



const styles = StyleSheet.create({})