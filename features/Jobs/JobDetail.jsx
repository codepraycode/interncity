import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import NotFound from '../../states/NotFound';

import { useJob } from '../../hooks/useJobs';
import { JobDetailHeader } from '../../components/organization/Header';
import Tabs from '../../components/Tabs';
import { CompanyInfo, PlacementDetailInfo } from '../../components/organization/Info';
import { DurationPicker } from '../../components/form/FormComponents';
import { ApplicationModal, Preloader } from '../../components/Modal';
import AppContext from '../../app/context';

const JobDetail = ({ route }) => {
    const { jobId } = route.params;
    
    const { job,sendApplication } = useJob(jobId);

    const {userProfile:{id:studentId}} = useContext(AppContext);

    const [tabNo, setTabNo] = useState(0);
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState(null);
    const [applying, setApplying] = useState(false);

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
                <DurationPicker
                    value={duration}
                    updateValue={(val)=>setDuration(val)}
                />

                {/* Call to action style={{marginTop:40}}*/}
                <Button 
                    text="Apply Now" 
                    onPress={()=>{
                        if(!duration) return;
                        setApplying(true);
                    }}
                    disable={!duration}
                    style={{
                        width: 180,
                        marginLeft:20,
                    }}
                />
            </View>

            <ApplicationModal
                show={applying} 
                title = {"Send Application"}
                message = {"You are about to apply for the role of"}
                target={job.role}
                onHide={(applied=false)=>{

                    if(applied){
                        console.log("send application");

                        setLoading(true);

                        sendApplication(job, studentId)
                        .then(()=>{
                            console.log("Sent application!")
                            setTimeout(()=>{setLoading(false)}, 3000);
                        })
                        .catch((err)=>{
                            console.log("Error while applying job:", err);
                            setLoading(false);
                        })
                    }

                    setApplying(false);
                }}
            />

            <Preloader
                show={loading} 
                text={"Loading..."}
            />
        </ScrollView>

    );
}

export default JobDetail;



const styles = StyleSheet.create({})