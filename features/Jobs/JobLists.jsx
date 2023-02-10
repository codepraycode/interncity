import React, { useContext, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native';
import AppContext from '../../app/context';
import { JobBottomSheet } from '../../components/BottomSheet';
import FloatingButton from '../../components/FloatingButton';
import { useJob, useJobs } from '../../hooks/useJobs';
import NoJobs from '../../states/NoJobs';
import LoadingJobs from '../../states/LoadingJobs';
import JobListItem from './JobListItem';
import { Preloader } from '../../components/Modal';

// Create the jobs screen

export const JobListsScreen = ({ navigation }) => {
    
    const {isOrganization} = useContext(AppContext);
    const [jobUpdate, setJobUpdate] = useState(null);
    const [jobs, loading] = useJobs();

    const [loadingJobs, setLoadingJobs] = useState(false);
    
    const {deleteJob} = useJob();

    const [deletingJob, setDeletingJob] = useState(false);

    const handleDeleteJob = (jobId) => {
        
        setDeletingJob(true);
        deleteJob(jobId)
        .then(()=>setDeletingJob(false))
        .catch((err)=>{
            console.log(err);
            setDeletingJob(false);
        })
    }
    
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
                renderItem = {({item})=>(
                    <JobListItem
                        jobItem = { item}
                        onViewClick = {()=>{
                            if (isOrganization) return setJobUpdate(p=>item);
                            // Otherwise
                            navToApplyJob(item.id);
                        }}
                        onDelete={(jobId)=>handleDeleteJob(jobId)}
                    />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={ emptyComponent }
                refreshing={loadingJobs}

                onRefresh={()=>{
                    console.log("Refreshing");
                    setLoadingJobs(true);
                    setTimeout(()=>setLoadingJobs(false),3000);
                }}
            />

            {
                isOrganization && (
                    <>
                        <FloatingButton onPress={()=>setJobUpdate(p=>({}))}/>
                        <JobBottomSheet 
                            jobId={jobUpdate?.id}
                            show={Boolean(jobUpdate)} 
                            onDismiss={()=>setJobUpdate(p=>null)}
                        />
                        <Preloader show={deletingJob} text="Deleting job..."/>
                    </>
                )
            }

        </>
    );
}




const styles = StyleSheet.create({})