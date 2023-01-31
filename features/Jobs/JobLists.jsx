import React, { useContext, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import AppContext from '../../app/context';
import { JobBottomSheet } from '../../components/BottomSheet';
import FloatingButton from '../../components/FloatingButton';
import { useJob, useJobs } from '../../hooks/useJobs';
import assets from '../../constants/assets'
import Theme from '../../constants/theme';
import NoJobs from '../../states/NoJobs';
import LoadingJobs from '../../states/LoadingJobs';

// Create the jobs screen

const JobItem = ({jobItem, editor, onViewClick})=>{
    
    const [jobInfo] = useJob(jobItem.id);

    if (!jobInfo) return <></>;

    const {title, location, company, sectors, } = jobInfo;

    return (
        <Card clickable={editor} onPress={onViewClick}>
            
            <View>
                <Image 
                    assetName={"google"}
                    assetGroup="assets" 
                    width={30} height={30}
                    style={{
                        marginVertical: 10,
                    }}
                />

                <View style={{marginVertical: 10,}}>
                    <Text h4>{title}</Text>
                    <Text p>{company?.name} -- {location.city} {location.state}</Text>
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
                {/* <Text p>some minutes ago</Text> */}

                {
                    !editor && <Button text={"View"} small={true} onPress={()=>onViewClick()}/>
                }
                
            </View>
        </Card>
    )
}


export const JobListsScreen = ({ navigation }) => {
    const {isOrganization} = useContext(AppContext);
    const [jobUpdate, setJobUpdate] = useState(null);
    const [jobsState] = useJobs();

    const {jobs, settingUp, error, loading} = jobsState;


    let emptyComponent = <NoJobs isOrganization={isOrganization}/>;

    if (settingUp) emptyComponent = <LoadingJobs isOrganization={isOrganization}/>;

    if (error){
        console.error(error);
    }

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
                        if (isOrganization) return navToApplyJob(item.id)
                        
                        // Otherwise
                        setJobUpdate(p=>item)
                    }}
                />}
                keyExtractor={item => item.id}
                ListEmptyComponent={ emptyComponent }
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