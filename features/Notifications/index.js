import React from 'react'
import { View, Text, Image } from 'react-native-ui-lib';
import { FlatList, StyleSheet } from 'react-native';
// import Theme from '../../constants/theme';
import { CompanyLists, JobsLists, NotificationsList } from '../../constants/dummy';
import Card from '../../components/Card';
import Theme from '../../constants/theme';


const NotificationItem = ({ notification })=>{
    const {jobId} = notification.data;

    const job = JobsLists.find(e=>e.id === jobId);

    if (!job) return null;

    const company = CompanyLists.find(e=>e.id === job.companyId) || {};
    
    return (
        <Card>
            
            <View>
                {
                    company.logo && (
                        <Image
                            assetName={company.logo}
                            assetGroup="assets" 
                            width={30} height={30}
                            style={{
                                marginVertical: 10,
                            }}
                        />
                    )
                }
                <Text h4>{notification.title}</Text>
                <Text p style={{marginVertical: 15}}>{notification.description}</Text>
            </View>            

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>some minutes ago</Text>
            </View>
        </Card>
    )
}


const NotificationScreen = () => {
    return (
        <FlatList
            data={ NotificationsList }
            renderItem = {({item})=><NotificationItem notification = { item}/>}
            keyExtractor={item => item.id}
            contentContainerStyle={{
                backgroundColor:Theme.grey100,
                paddingBottom: 20
            }}
        />
    )
}

const styles = StyleSheet.create({});
export default NotificationScreen;