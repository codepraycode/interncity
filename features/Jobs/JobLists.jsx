import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import Theme from '../../constants/theme';

// Create the jobs screen
const NoJob = () => {
    return (
        <View flex center>
            <Text>No Job screen!</Text>
        </View>
    )
}


const JobItem = ()=>{
    return (
        <Card>
            
            <View
                style={{
                    // padding: 10
                }}
            >
                <View 
                    center
                    style={{
                        backgroundColor:Theme.grey100, 
                        width: 50, 
                        height: 50,
                        borderRadius: 25,
                    }}
                >
                    <Image 
                        assetName="google" 
                        assetGroup="assets" 
                        width={30} height={30}
                        style={{
                            marginVertical: 10,
                        }}
                    />
                </View>
                <Text h4>Google Incoporation</Text>
                <Text p>Google inc. Ikeja, Lagos</Text>
            </View>

            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    // alignItems:'center',
                    marginVertical: 10,
                }}
            >
                <Tags text="Full time"/>
                <Tags text="Entry"/>
                <Tags text="Real"/>
            </View>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text p>25 minutes ago</Text>

                <Button text={"View"} small={true} onPress={()=>{}}/>
            </View>
        </Card>
    )
}

const JobLists = () => {
    return <JobItem/>; //<NoJob/>
}

export default JobLists;



const styles = StyleSheet.create({})