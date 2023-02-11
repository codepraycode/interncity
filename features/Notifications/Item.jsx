import React from 'react'
import { View, Text, Image } from 'react-native-ui-lib';
import { JSONLog } from '../../app/utils';
import Card from '../../components/Card';
import assets from '../../constants/assets';
import {useJob} from '../../hooks/useJobs';

const StudentNotificationItem = ({ data })=>{
    
    return (
        <>
            
            <View style={{flexDirection:'row', 'alignItems':'center'}}>
                <Image
                    source={assets.google}
                    resizeMode="cover"
                    width={40} height={40}
                    style={{
                        marginVertical: 10,
                    }}
                />


                <Text h4 
                    style={{paddingLeft: 20, maxWidth:'87%',}}
                >
                    {data.title}
                </Text>
            </View>

            <Text p style={{marginVertical: 15}}>
                {data.description}
            </Text>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>two minutes ago</Text>
            </View>
        </>
    )
}

const OrganizationNotificationItem = ({ data })=>{
    
    return (
        <>  
            <View style={{
                flexDirection:'row', 'alignItems':'center',
                marginVertical: 10,
                }}>
                <Image
                    source={assets.user}
                    resizeMode="cover"
                    width={40} height={40}
                    style={{
                        // marginVertical: 10,
                        marginRight:10,
                    }}
                />


                <Text h4>{data.title}</Text>
            </View>
            <Text p style={{marginVertical: 10}}>
                {data.message}
            </Text>
            

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>two minutes ago</Text>
            </View>
        </>
    )
}


const determineNotificationContent = ({notification, job})=>{
    /* 
        Offer_date - when the organization made the offer
        job_started - when the student accepted the offer
        date_applied - when the student made the application
    */

    const {id, offer_date, job_started, date_applied} = notification;
    let message = {
        id,
        title: null,
        message: null,
    }

    let role = job.role;

    if(offer_date && job_started){
        // Student accepted job offer
        message.title = "Offer accepted!"
        message.message = `Student accepted your offer for the role of ${role}.`
    }
    else if (date_applied){
        message.title = "New application!"
        message.message = `A student applied for the role of ${role}`
    }

    return message;
}

const NotificationItem = ({ isOrganization, notification })=>{

    let template;
    let message;

    const {job:jobId} = notification;

    const {job} = useJob(jobId);

    // JSONLog(job);
    
    message = determineNotificationContent({
        notification,
        job,
    });

    if (isOrganization) template = <OrganizationNotificationItem data={message}/>;

    else template = <StudentNotificationItem data={notification}/>;
    return (
        <Card unread={notification.unread}>
            {template}
        </Card>
    )

}

export default NotificationItem;