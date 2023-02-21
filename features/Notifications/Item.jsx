import React from 'react'
import { View, Text, Image } from 'react-native-ui-lib';
import { getTimeDate, getTimeDistance, JSONLog } from '../../app/utils';
import Card from '../../components/Card';
import assets from '../../constants/assets';
import {useJob} from '../../hooks/useJobs';
import Avatar from '../../components/Avatar';
import { useAProfile } from '../../hooks/useProfile';

const determineNotificationContent = ({notification, job, profile, isOrganization}) => {
    /* 
        Offer_date - when the organization made the offer
        job_started - when the student accepted the offer
        date_applied - when the student made the application
    */

    const {id, offer_date, job_started, date_applied} = notification;
    let message = {
        id,
        avatar: profile?.avatar,
        title: null,
        message: null,
        time: null,
    }

    let role = job.role || '...';


    const orgName = job.company?.name ? job.company.name : "the company offering the job.";

    if(!isOrganization){
        message.title = `Application for ${role}`
        message.message = `Click to view your application for the role of ${role} at ${orgName}`;
        message.time = getTimeDistance(date_applied)
    }
    else if(offer_date && job_started){
        // Student accepted job offer
        message.title = "Offer accepted!"
        message.message = `Student accepted your offer for the role of ${role}.`
        message.time = getTimeDistance(job_started || offer_date)
    }
    else if (date_applied){
        message.title = "New application!"
        message.message = `A student applied for the role of ${role}`;
        message.time = getTimeDistance(date_applied)
    }

    return message;
}

const StudentNotificationItem = ({ data })=>{
    const {avatar, title, message, time} = data;
    
    return (
        <>
            
            <View style={{flexDirection:'row', 'alignItems':'center'}}>
                <Avatar
                    image={avatar}
                    width={60} height={60}
                    imageStyle={{
                        marginRight: 10
                    }}
                />


                <Text h4 
                    style={{maxWidth:'87%',}}
                >
                    {title}
                </Text>
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

const OrganizationNotificationItem = ({ data })=>{

    const {avatar, title, message, time} = data;

    return (
        <>  
            <View style={{
                flexDirection:'row', 'alignItems':'center',
                marginVertical: 10,
                }}>
                <Avatar
                    image={avatar}
                    width={60} height={60}
                    imageStyle={{
                        marginRight: 10
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

    const {job:jobId, id, student:studentId, organization:organizationId} = notification;

    const {job} = useJob(jobId);
    const [student] = useAProfile(studentId);
    const [organization] = useAProfile(organizationId);

    message = determineNotificationContent({
        notification,
        job,
        profile: isOrganization ? student : organization,
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