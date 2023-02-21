import { View, Text } from 'react-native-ui-lib';
import React from 'react'
import Card from '../Card';
import assets from '../../constants/assets';
import Seperator from '../Seperator';
import { useIntern, useStudent} from '../../hooks/useIntern';
import Avatar from '../../components/Avatar';
import { JSONLog } from '../../app/utils';

const Item = ({student:studentData, isSupervisor, onViewClick}) => {
    const {id, ...rest} = studentData;

    const { intern:placementData } = isSupervisor ? useStudent(studentData) : useIntern(studentData.id);


    let intern = placementData || {};
    
    if (!placementData) {

        const {fullname} = rest;

        intern.student = {fullname};
        intern.organization = {name: "No placement yet"};
    }

    return (
        <Card clickable={true} onPress={onViewClick}>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:5,}}>

                <Avatar
                    image={intern.student.avatar}
                    width={65} height={65}
                />

                <View style={{marginLeft:20,}}>
                <Text h4>{intern.student?.fullname}</Text>
                <View style={{flexDirection:'row', 'alignItems':'center'}}>
                    
                    {
                        isSupervisor ?
                        (
                            
                            intern.organization?.name ?
                            <Text p>{ intern.organization?.name}</Text>
                            :
                            <Text i>No placement yet</Text>
                            
                        )
                        :
                        <>
                            <Text small>{intern.student?.schoolData?.short}</Text>
                            <Seperator/>
                            <Text small>{intern.job?.role}</Text>
                        </>
                    }
                </View>
                </View>
            </View>
        </Card>
    )
}

export default Item;