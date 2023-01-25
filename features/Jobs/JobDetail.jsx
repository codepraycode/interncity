import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import JobNotFound from '../../states/JobNotFound';

import Octicons from 'react-native-vector-icons/Octicons';
import Tags from '../../components/Tags';

const Seperator = ()=> <View style={{width: 5, height: 5, borderRadius: 2.5, backgroundColor: Theme.accent}}></View>


const JobDetailHeader = ({job:jobInfo, company})=>{

    return (
        <>
            <View 
                center 
                style={{
                    // backgroundColor:Theme.white,
                    paddingTop: 0,
                    zIndex:1,
                }}
            >
                {
                    company.logo && (
                        <Image 
                            assetName={company.logo}
                            assetGroup="assets" 
                            width={70} height={70}
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

    return (
        <View>
            <View>
                <Text h5 style={{marginVertical: 10}}>About company</Text>

                <Text p style={{marginVertical: 10}}>
                    {company.about}
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Website
                </Text>

                <Text a secondary>
                    {company.website}
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Industry
                </Text>

                <Text p>
                    Technology
                </Text>
            </View>


            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Employee size
                </Text>

                <Text p>
                    132, 121 employees
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Head office
                </Text>

                <Text p>
                    Ikeja, Lagos
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Type
                </Text>

                <Text p>
                    Multinational company
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Since
                </Text>

                <Text p>
                    1998
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Specialization
                </Text>

                <Text p>
                    {company.specialization}
                </Text>
            </View>

        </View>
    )
}

const JobInfomation = ({job}) =>{

    return(
        <View>

            <View style={{marginVertical: 10}}>

                <Text h3 style={{marginVertical: 5}}>
                    {job.title}
                </Text>
            </View>

            <View>
                <Text h5 style={{marginVertical: 10}}>About job</Text>

                <Text p style={{marginVertical: 10}}>
                    {job.about}
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Duration
                </Text>

                <Text p>
                    {job.duration}
                </Text>
            </View>


            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Pay
                </Text>

                {job.pay ? 
                    <Text p>
                        {job.pay}
                    </Text>
                    : 
                    <Text i>
                        No pay
                    </Text>
                }
                
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Location
                </Text>

                <Text p>
                    Ikeja, Lagos
                </Text>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Tags
                </Text>

                <Tags tags={job.tags}/>
            </View>

            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 5}}>
                    Duration
                </Text>

                <Text p>
                    {job.duration}
                </Text>
            </View>

        </View>
    )
}

const Tab = ({text, onClick, active})=> (
    <TouchableOpacity 
        onPress={onClick}
        center 
        style={{
            backgroundColor:active ? Theme.secondary : 'transparent',
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 15,
            marginHorizontal: 15,
        }}
    >
        <Text label style={{color: active ? Theme.white : Theme.accent }}>{text}</Text>
    </TouchableOpacity>
)

const JobDetail = ({ route }) => {
    const { jobId } = route.params;
    const job = JobsLists.find(each => each.id === jobId);
    const [tabNo, setTabNo] = useState(0);
    const [showModal, setShowModal] = useState(false);

    if (!Boolean(job)) return <JobNotFound/>;

    const company = CompanyLists.find(each => each.id === job.companyId);
    
    if (!Boolean(company)) return <JobNotFound text={"Job company not found!"}/>;

    return (

        <ScrollView 
            contentContainerStyle={{
                backgroundColor:Theme.grey100,
            }}
        >

            <JobDetailHeader job = { job } company = {company}/>

            <View>
                {/* Tabs */}
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
                        <Tab text="About company" onClick={()=>setTabNo(0)} active={tabNo === 0}/>
                        <Tab text="About job" onClick={()=>setTabNo(1)} active={tabNo === 1}/>
                    </View>
                </View>


                {/* Content */}
                <View
                    style={{
                        paddingVertical: 10,
                        marginHorizontal: 20,
                    }}
                >
                    {
                        tabNo === 0 ? 
                        <JobComapanyInfomation company={company}/>
                        :
                        <JobInfomation job={job}/>
                    }
                </View>


                {/* Call to action */}
                <View center style={{marginVertical: 15}}>
                    <Button text="Apply Now" onPress={()=>setShowModal(p=>!p)}/>
                </View>
                
            </View>
        </ScrollView>

    );
}

export default JobDetail;



const styles = StyleSheet.create({})