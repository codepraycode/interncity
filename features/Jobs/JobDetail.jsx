import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';
import JobNotFound from '../../states/JobNotFound';

const JobDetail = ({ route }) => {
    console.log(route.params);
    const { jobId } = route.params;
    const JobInfo = JobsLists.find(each => each.id === jobId);

    if (!Boolean(JobInfo)) return <JobNotFound/>;

    return (
        <View flex center>
            <Text>
                Job Detail for job#{jobId} screen!
            </Text>
        </View>
    );
}

export default JobDetail;



const styles = StyleSheet.create({})