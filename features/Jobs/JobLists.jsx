import React from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native-ui-lib';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import Theme from '../../constants/theme';
import { CompanyLists, JobsLists } from '../../constants/dummy';

// Create the jobs screen
const NoJob = () => {
    return (
        <View flex center>
            <Text>No Job screen!</Text>
        </View>
    )
}


const JobItem = ({jobItem})=>{
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

            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    // alignItems:'center',
                    marginVertical: 4,
                }}
            >
                {
                    tags.map((e, i)=><Tags text={e || '--'} key={i}/>)
                }
            </View>

            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <Text p>some minutes ago</Text>

                <Button text={"View"} small={true} onPress={()=>{}}/>
            </View>
        </Card>
    )
}

const JobLists = () => {
    return (
        <FlatList
            data={ JobsLists }
            renderItem = {({item})=><JobItem jobItem = { item}/>}
            keyExtractor={item => item.id}
        />
    );
}

export default JobLists;



const styles = StyleSheet.create({})