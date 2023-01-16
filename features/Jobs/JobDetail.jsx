import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';


const JobDetail = ({ route }) => {
    const { jobId } = route.params;
    return (
        <Text>
            Job Detail for job#{jobId} screen!
        </Text>
    );
}

export default JobDetail;



const styles = StyleSheet.create({})