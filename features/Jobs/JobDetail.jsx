import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import JobNotFound from '../../states/JobNotFound';


const Seperator = ()=> <View style={{width: 5, height: 5, borderRadius: 2.5, backgroundColor: Theme.accent}}></View>

const JobDetail = ({ route }) => {
    const { jobId } = route.params;
    const JobInfo = JobsLists.find(each => each.id === jobId);
    if (!Boolean(JobInfo)) return <JobNotFound/>;

    const JobCompanyInfo = CompanyLists.find(each => each.id === JobInfo.companyId);
    
    if (!Boolean(JobCompanyInfo)) return <JobNotFound text={"Job company not found!"}/>;

    return (
        <View 
            flex
            style={{
                backgroundColor:Theme.grey100
            }}
        >
            <View 
                center 
                style={{
                    // backgroundColor:Theme.white,
                    paddingTop: 30,
                    zIndex:1,
                }}
            >
                {
                    JobCompanyInfo.logo && (
                        <Image 
                            assetName={JobCompanyInfo.logo}
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
                    paddingBottom: 20,
                    backgroundColor:Theme.grey101,
                }}
            >
                <Text 
                    center 
                    h5
                >{JobInfo.title}</Text>

                <View 
                    style={{
                        flexDirection:'row', 
                        justifyContent:'space-evenly', 
                        alignItems:'center',

                        marginVertical: 15,
                    }}
                >
                    <Text center label>{JobCompanyInfo.name}</Text>
                    <Seperator/>
                    <Text center label>{JobInfo.location.city}</Text>
                    <Seperator/>
                    <Text center label>2 days ago</Text>
                </View>
            </View>

            <View
                style={{
                    // backgroundColor:Theme.white,
                }}
            >
                <Text>Other content</Text>
            </View>
        </View>
    );
}

export default JobDetail;



const styles = StyleSheet.create({})