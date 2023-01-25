import React, { useContext, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import Octicons from 'react-native-vector-icons/Octicons';
import AppContext from '../../app/context';
import { JobBottomSheet } from '../../components/BottomSheet';

// Create the jobs screen

const JobItem = ({jobItem, editor, onViewClick})=>{
    const company = CompanyLists.find(e=>e.id === jobItem.companyId) || {};
    const title = jobItem.title || '';
    const decription = `${company.name || '---'} ${company.headOffice.town || "---"} ${company.headOffice.city || "---"}`;
    const tags = jobItem.tags || []

    return (
        <Card clickable={editor} onPress={onViewClick}>
            
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
                <Text h4>{title}</Text>
                <Text p>{decription}</Text>
            </View>

            <Tags tags={tags}/>

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

    return (
        <>
            
            <FlatList
                data={ JobsLists }
                renderItem = {({item})=><JobItem 
                    jobItem = { item}
                    editor = {isOrganization}
                    onViewClick = {()=>setJobUpdate(p=>item)}
                />}
                keyExtractor={item => item.id}
            />

            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    position:'absolute',
                    bottom:10,
                    right:5,
                    width:60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor:Theme.accent,
                    alignItems:'center',
                    justifyContent:'center'
                }}
                onPress={()=>setJobUpdate(p=>({}))}
            >
                <Octicons name={'plus'} size={30} color={Theme.white} />
            </TouchableOpacity>

            <JobBottomSheet data={jobUpdate || {}} show={Boolean(jobUpdate)} onDismiss={()=>setJobUpdate(p=>null)}/>
        </>
    );
}




const styles = StyleSheet.create({})