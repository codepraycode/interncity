import React from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import { getTimeDistance } from '../../app/utils';
import Card from '../../components/Card';
import { useJob } from '../../hooks/useJobs';
import useSector from '../../hooks/useSector';
import Avatar from '../../components/Avatar';


const JobListItem = ({jobItem, onViewClick, onDelete})=>{
    
    const {job: jobInfo} = useJob(jobItem.id);

    const {role, location, company, sector:sectorId, } = jobInfo.original;

    const sector = useSector(sectorId);

    const createdDate = jobInfo.createdAt && getTimeDistance(jobInfo.createdAt);
    return (
        <Card clickable={true} onPress={onViewClick} onLongPress={()=>onDelete(jobInfo.id)}>
            
            <View style={{flexDirection:'row', marginBottom:10, marginTop:5, alignItems:'center'}}>

                <Avatar 
                    image={company.avatar} 
                    width={50} height={50}
                    imageStyle={{
                        marginRight: 10,
                    }}
                />

                <View style={{width: "80%"}}>
                    <Text h4>{role}</Text>
                    <Text small
                        style={{
                            marginTop: 10,
                        }}
                    >{company?.name} | {location.city}</Text>
                </View>
            </View>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginTop: 10,
                }}
            >
                <Text i>{sector}</Text>
                <Text i>{createdDate}</Text>
                
            </View>
        </Card>
    )
}

export default JobListItem;