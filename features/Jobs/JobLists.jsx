import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import Card from '../../components/Card';


// Create the jobs screen
const NoJob = () => {
    return (
        <View flex center>
            <Text>No Job screen!</Text>
        </View>
    )
}


const JobItem = ()=>{
    return <Card/>
}

const JobLists = () => {
    return <JobItem/>; //<NoJob/>
}

export default JobLists;



const styles = StyleSheet.create({})