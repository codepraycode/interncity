import React from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import Card from '../../components/Card';
import { useJob } from '../../hooks/useJobs';
import useSector from '../../hooks/useSector';


const JobListItem = ({jobItem, onViewClick})=>{
    
    const {job: jobInfo} = useJob(jobItem.id);

    if (!jobInfo) return <></>;

    const {role, location, company, sector:sectorId, } = jobInfo.original;

    const sector = useSector(sectorId);

    return (
        <Card clickable={true} onPress={onViewClick}>
            
            <View style={{flexDirection:'row', marginBottom:10, marginTop:5, alignItems:'center'}}>
                <Image
                    assetName={"google"}
                    assetGroup="assets" 
                    width={40} height={40}
                    style={{
                        marginRight: 20,
                    }}
                />

                <View style={{width: "80%"}}>
                    <Text h4>{role}</Text>
                    <Text small
                        style={{
                            marginTop: 10,
                        }}
                    >{company?.name} | {location.city}, {location.state}</Text>
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
                <Text i>some minutes ago</Text>
                
            </View>
        </Card>
    )
}

export default JobListItem;