import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import JobNotFound from '../../states/JobNotFound';

import Octicons from 'react-native-vector-icons/Octicons';


const Seperator = ()=> <View style={{width: 5, height: 5, borderRadius: 2.5, backgroundColor: Theme.accent}}></View>


const JobDetailHeader = ({job:jobInfo, company})=>{

    return (
        <>
            <View 
                center 
                style={{
                    // backgroundColor:Theme.white,
                    paddingTop: 30,
                    zIndex:1,
                }}
            >
                {
                    company.logo && (
                        <Image 
                            assetName={company.logo}
                            assetGroup="assets" 
                            width={90} height={90}
                            style={{
                                position:'relative',
                                bottom: -20,
                                
                            }}
                        />
                    )
                }
            </View>

            <View
                style={{
                    paddingTop: 30,
                    paddingBottom: 5,
                    backgroundColor:Theme.grey101,
                }}
            >
                <Text 
                    center 
                    h5
                >{jobInfo.title}</Text>

                <View 
                    style={{
                        flexDirection:'row', 
                        justifyContent:'space-evenly', 
                        alignItems:'center',

                        marginVertical: 15,
                    }}
                >
                    <Text center label>{company.name}</Text>
                    <Seperator/>
                    <Text center label>{jobInfo.location.city}</Text>
                    <Seperator/>
                    <Text center label>2 days ago</Text>
                </View>
            </View>

            <View
                center
            >
                <View
                    center
                    style={{
                        flexDirection:'row',
                        backgroundColor:Theme.lightRed,
                        maxWidth: "80%",
                        paddingHorizontal: 20,
                        paddingVertical:10,
                        borderRadius: 6,
                        marginVertical: 10,
                    }}
                >
                    <Octicons name="link-external" size={15} color={Theme.red}/>

                    <Text style={{marginLeft: 10, color:Theme.red}}>
                        Visit website
                    </Text>
                </View>
                
            </View>
        </>
    )
}

const JobComapanyInfomation = ({company}) =>{

    return <View>
        <Text>About company</Text>
    </View>
}

const JobInfomation = ({job}) =>{

    return <View center flex>
        <Text>About company job</Text>
    </View>
}

const Tab = ({text})=> (
    <View 
        center 
        style={{
            backgroundColor:Theme.secondary,
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginHorizontal: 15,
        }}
    >
        <Text label style={{color: Theme.white}}>{text}</Text>
    </View>
)

const JobDetail = ({ route }) => {
    const { jobId } = route.params;
    const job = JobsLists.find(each => each.id === jobId);
    if (!Boolean(job)) return <JobNotFound/>;

    const company = CompanyLists.find(each => each.id === job.companyId);
    
    if (!Boolean(company)) return <JobNotFound text={"Job company not found!"}/>;

    return (
        <View 
            flex
            style={{
                backgroundColor:Theme.grey100
            }}
        >
            <JobDetailHeader job = { job } company = {company}/>

            <View >
                <View centerH>
                    <View
                        style={{
                            flexDirection:'row', 
                            alignItems:'center', 
                            justifyContent:'space-evenly',
                            backgroundColor:Theme.white,
                            padding: 5,
                            borderRadius: 5,
                            // maxWidth: "80%"
                        }}
                    >
                        <Tab text="About company"/>
                        <Tab text="About job"/>
                    </View>
                </View>

                <JobComapanyInfomation/>
            </View>
        </View>
    );
}

export default JobDetail;



const styles = StyleSheet.create({})