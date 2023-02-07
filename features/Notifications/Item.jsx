import React from 'react'
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import assets from '../../constants/assets';


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
            
            <View>
                <Image
                    source={assets.user}
                    resizeMode="cover"
                    width={40} height={40}
                    style={{
                        marginVertical: 10,
                    }}
                />


                <Text h4>{data.title}</Text>
                <Text p style={{marginVertical: 15}}>
                    {data.description}
                </Text>
            </View>            

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>{data.time}</Text>
            </View>
        </>
    )
}


const NotificationItem = ({ isOrganization, notification })=>{

    let template;

    if (isOrganization) template = <OrganizationNotificationItem data={notification}/>;

    template = <StudentNotificationItem data={notification}/>;
    return (
        <Card unread={notification.unread}>
            {template}
        </Card>
    )

}

export default NotificationItem;