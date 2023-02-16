import React from 'react'
import { View, Text, Image } from 'react-native-ui-lib';
import { getTimeDate, JSONLog } from '../../app/utils';
import Card from '../../components/Card';
import assets from '../../constants/assets';
import {useJob} from '../../hooks/useJobs';
import { formatDistance } from 'date-fns'

const determineNotificationContent = ({notification, job, isOrganization})=>{
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
        time: null,
    }

    let role = job.role || '...';


    const orgName = job.company?.name ? job.company.name : "the company offering the job.";

    if(!isOrganization){
        message.title = `Application for ${role}`
        message.message = `Click to view your application for the role of ${role} at ${orgName}`;
        message.time = formatDistance(getTimeDate(date_applied), new Date(), { addSuffix: true })
    }
    else if(offer_date && job_started){
        // Student accepted job offer
        message.title = "Offer accepted!"
        message.message = `Student accepted your offer for the role of ${role}.`
        message.time = formatDistance(getTimeDate(job_started || offer_date), new Date(), { addSuffix: true })
    }
    else if (date_applied){
        message.title = "New application!"
        message.message = `A student applied for the role of ${role}`;
        message.time = formatDistance(getTimeDate(date_applied), new Date(), { addSuffix: true })
    }

    return message;
}

const StudentNotificationItem = ({ data })=>{
    const {title, message, time} = data;
    
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
                    {title}
                </Text>
            </View>

            <Text p style={{marginVertical: 15}}>
                {message}
            </Text>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>{time}</Text>
            </View>
        </>
    )
}

const OrganizationNotificationItem = ({ data })=>{

    const {title, message, time} = data;

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


                <Text h4>{title}</Text>
            </View>
            <Text p style={{marginVertical: 10}}>
                {message}
            </Text>
            

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>{time}</Text>
            </View>
        </>
    )
}


const NotificationItem = ({ isOrganization, notification, handleClick })=>{

    let template;
    let message;

    const {job:jobId, id} = notification;

    const {job} = useJob(jobId);

    message = determineNotificationContent({
        notification,
        job,
        isOrganization,
    });

    if(!job.original) return null;

    if (isOrganization) template = <OrganizationNotificationItem data={message}/>;

    else template = <StudentNotificationItem data={message}/>;
    return (
        <Card clickable unread={!notification.viewed} onPress={()=>handleClick(id)}>
            {template}
        </Card>
    )

}

export default NotificationItem;