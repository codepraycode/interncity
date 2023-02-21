import { View, Text, Image } from 'react-native-ui-lib';
import React from 'react'
import Card from '../Card';
import { getTimeDate } from '../../app/utils';
import { useJob } from '../../hooks/useJobs';
import Avatar from '../Avatar';


const PlacementItem = ({onView, placement}) => {
    const {job} = useJob(placement.job);

    const { job_started, job_ended, duration} = placement;

    const jobStarted = getTimeDate(job_started).toDateString();
    const jobEnded = job_ended ? getTimeDate(job_ended).toDateString() : 'present';

    return (
        <Card clickable={true} onPress={onView}>
            
            <View style={{flexDirection:'row', marginBottom:20, marginTop:10, alignItems:'center'}}>
                <Avatar 
                    image={job.company.avatar}
                    width={45} height={45}
                    imageStyle={{
                        marginRight: 10,
                    }}
                />

                <View style={{width: "80%"}}>
                    
                    <Text h5>{job.role}</Text>
                    
                    <Text small
                        style={{
                            marginTop: 5,
                        }}
                    >{job.company?.name}</Text>
                </View>
            </View>

            {/* <Tags tags={sectors}/> */}

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>{jobStarted} - {jobEnded} | {duration} months</Text>
            </View>
        </Card>
    )
}


export default PlacementItem;