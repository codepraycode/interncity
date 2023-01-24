import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import { StatusBar } from 'expo-status-bar';

// Create the jobs screen

const JobItem = ({jobItem, onViewClick})=>{
    const company = CompanyLists.find(e=>e.id === jobItem.companyId) || {};
    const title = jobItem.title || '';
    const decription = `${company.name || '---'} ${company.headOffice.town || "---"} ${company.headOffice.city || "---"}`;
    const tags = jobItem.tags || []

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

                <Button text={"View"} small={true} onPress={()=>onViewClick()}/>
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




const styles = StyleSheet.create({})