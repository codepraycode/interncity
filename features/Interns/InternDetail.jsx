import React, { useState } from 'react'
import { ScrollView,Image, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, } from 'react-native-ui-lib';
import Theme from '../../constants/theme';
import { CompanyLists, InternLists, JobsLists } from '../../constants/dummy';
import JobNotFound from '../../states/JobNotFound';

import Octicons from 'react-native-vector-icons/Octicons';
import assets from '../../constants/assets';

const Seperator = ()=> <View style={{width: 5, height: 5, borderRadius: 2.5, backgroundColor: Theme.accent}}></View>


const InternDetailHeader = ({data})=>{

    const name = `Lorem Ipsum`;
    const school = "Federal University of Technology Akure"

    return (
        <>
            <View 
                center
                style={{
                    zIndex:1,
                }}
            >

                <Image
                    source={assets.user}
                    resizeMode="cover"
                    width={80} height={80}
                    style={{
                        position:'relative',
                        bottom: -20,
                        
                    }}
                />

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
                >{name}</Text>                

                <View 
                    style={{
                        marginVertical: 10,
                    }}
                >
                    <Text center label>{"IT intern"}</Text>
                    <Text center label>{school}</Text>
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
                        View CV
                    </Text>
                </View>
                
            </View>
        </>
    )
}

const InternInformation = ({data}) =>{

    return (
        <View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>Phone number</Text>

                <Text p>
                    +234 8000000000
                </Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>Address</Text>

                <Text p style={{marginVertical: 0}}>
                    Ota, Lagos.
                </Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>Department</Text>

                <Text p style={{marginVertical: 0}}>
                    Cyber security
                </Text>
            </View>
            <View style={{marginVertical: 10}}>
                <Text h5 style={{marginVertical: 10}}>School</Text>

                <Text p style={{marginVertical: 0}}>
                    Federal University of Technology Akure
                </Text>
            </View>

        </View>
    )
}

const InternReview = () =>{

    return(
        <View center>
            <Text>Intern review log</Text>
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

const InternsDetailScreen = ({ route }) => {
    const { internId} = route.params;
    const internData = InternLists.find(each => each.id === internId);
    const internJob = JobsLists.find(each => each.id === internData.jobId);

    const [tabNo, setTabNo] = useState(0);
    const [showModal, setShowModal] = useState(false);

    if (!Boolean(internData)) return <JobNotFound/>;

    return (

        <ScrollView 
            contentContainerStyle={{
                backgroundColor:Theme.grey100,
            }}
        >

            <InternDetailHeader intern = { internData }/>

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
                        <Tab text="Intern Info" onClick={()=>setTabNo(0)} active={tabNo === 0}/>
                        <Tab text="Weekly Reviews" onClick={()=>setTabNo(1)} active={tabNo === 1}/>
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
                        <InternInformation data={internData}/>
                        :
                        <InternReview/>
                    }
                </View>                
            </View>
        </ScrollView>

    );
}

export default InternsDetailScreen;



const styles = StyleSheet.create({})