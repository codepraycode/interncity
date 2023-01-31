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
import useJob from '../../hooks/useJobs';
import assets from '../../constants/assets'
import Theme from '../../constants/theme';
import NoJobs from '../../states/NoJobs';

// Create the jobs screen

const JobItem = ({jobItem, editor, onViewClick})=>{
    // const company = CompanyLists.find(e=>e.id === jobItem.companyId) || {};
    // const title = jobItem.title || '';
    // const decription = `${company.name || '---'} ${company.headOffice.town || "---"} ${company.headOffice.city || "---"}`;
    // const tags = jobItem.tags || []

    const {title, location, company, sectors, } = jobItem;

    return (
        <Card clickable={editor} onPress={onViewClick}>
            
            <View>
                <Image 
                    assetName={assets.google}
                    assetGroup="assets" 
                    width={30} height={30}
                    style={{
                        marginVertical: 10,
                    }}
                />
                <Text h4>{title}</Text>
                <Text p>{company.name} -- {location.city} {location.state}</Text>
            </View>

            <Tags tags={sectors}/>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text p>some minutes ago</Text>

                {
                    !editor && <Button text={"View"} small={true} onPress={()=>onViewClick()}/>
                }
                
            </View>
        </Card>
    )
}

export const JobApplyListsScreen = ({ navigation }) => {
    const handleNavigateToDetail = (jobItem)=>{
        navigation.navigate("Job", { 
            screen: "JobDetail", 
            params: {jobId: jobItem.id}
        });
    }
    return (
        <>
            {/* <StatusBar style="dark" /> */}
            
            <FlatList
                data={ JobsLists }
                renderItem = {({item})=><JobItem jobItem = { item} onViewClick = {()=>handleNavigateToDetail(item)}/>}
                keyExtractor={item => item.id}
            />
        </>
    );
}

export const JobListsScreen = ({ navigation }) => {
    const {isOrganization} = useContext(AppContext);
    const [jobUpdate, setJobUpdate] = useState(null);
    const [_, jobs] = useJob();

    console.log(jobs)

    return (
        <>
            
            <FlatList
                data={ jobs }
                renderItem = {({item})=><JobItem 
                    jobItem = { item}
                    editor = {isOrganization}
                    onViewClick = {()=>setJobUpdate(p=>item)}
                />}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <NoJobs isOrganization={isOrganization}/>
                }
            />

            <FloatingButton onPress={()=>setJobUpdate(p=>({}))}/>

            <JobBottomSheet data={jobUpdate || {}} show={Boolean(jobUpdate)} onDismiss={()=>setJobUpdate(p=>null)}/>
        </>
    );
}




const styles = StyleSheet.create({})