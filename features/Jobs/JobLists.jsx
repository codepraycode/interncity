import React, { useContext, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import AppContext from '../../app/context';
import { JobBottomSheet } from '../../components/BottomSheet';
import FloatingButton from '../../components/FloatingButton';
import { useJob, useJobs } from '../../hooks/useJobs';
import NoJobs from '../../states/NoJobs';
import LoadingJobs from '../../states/LoadingJobs';

// Create the jobs screen

const JobItem = ({jobItem, editor, onViewClick})=>{
    
    const [jobInfo] = useJob(jobItem.id);

    if (!jobInfo) return <></>;

    const {title, location, company, sectors, } = jobInfo;

    return (
        <Card clickable={true} onPress={onViewClick}>
            
            <View style={{flexDirection:'row', marginBottom:20, marginTop:10, alignItems:'center'}}>
                <Image 
                    assetName={"google"}
                    assetGroup="assets" 
                    width={40} height={40}
                    style={{
                        marginRight: 20,
                    }}
                />

                <View style={{width: "80%"}}>
                    <Text h4>{title}</Text>
                    <Text small
                        style={{
                            marginTop: 10,
                        }}
                    >{company?.name} | {location.city}, {location.state}</Text>
                </View>
            </View>

            <Tags tags={sectors}/>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text i>some minutes ago</Text>

                {/* {
                    !editor && <Button text={"View"} small={true} onPress={()=>onViewClick()}/>
                } */}
                
            </View>
        </Card>
    )
}


export const JobListsScreen = ({ navigation }) => {
    
    const {isOrganization} = useContext(AppContext);
    const [jobUpdate, setJobUpdate] = useState(null);
    const [jobs, loading] = useJobs();

    let emptyComponent = <NoJobs isOrganization={isOrganization}/>;

    if (loading) emptyComponent = <LoadingJobs isOrganization={isOrganization}/>;


    const navToApplyJob = (jobId)=>{
        navigation.navigate("Job", { 
            screen: "JobDetail", 
            params: { jobId }
        });
    }


    return (
        <>
            
            <FlatList
                data={ jobs }
                renderItem = {({item})=><JobItem 
                    jobItem = { item}
                    editor = {isOrganization}
                    onViewClick = {()=>{
                        if (isOrganization) return setJobUpdate(p=>item)

                        // Otherwise
                        navToApplyJob(item.id)                        
                        
                    }}
                />}
                keyExtractor={item => item.id}
                ListEmptyComponent={ emptyComponent }
                refreshing={false}

                onRefresh={()=>{
                    console.log("Refreshing");
                    reloadJobs()
                }}
            />

            {
                isOrganization && (
                    <>
                        <FloatingButton onPress={()=>setJobUpdate(p=>({}))}/>
                        <JobBottomSheet data={jobUpdate || {}} show={Boolean(jobUpdate)} onDismiss={()=>setJobUpdate(p=>null)}/>
                    </>
                )
            }

        </>
    );
}




const styles = StyleSheet.create({})