import { View, Text, Image } from 'react-native-ui-lib';
import React from 'react'
import Card from '../Card';
import assets from '../../constants/assets';
import Seperator from '../Seperator';
import { useIntern, useStudent} from '../../hooks/useIntern';
import { JSONLog } from '../../app/utils';

const Item = ({student:studentData, isSupervisor, onViewClick}) => {

    const {id, ...rest} = studentData;

    const { intern:placementData } = useStudent(studentData);

    let intern = placementData || {};
    
    if (!placementData) {

        const {fullname} = rest;

        intern.student = {fullname};
        intern.organization = {name: "No placement yet"};
    }


    return (
        <Card clickable={true} onPress={onViewClick}>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:5,}}>

                <Image
                    source={assets.user}
                    resizeMode="cover"
                />

                <View style={{marginLeft:20,}}>
                <Text h4>{intern.student?.fullname}</Text>
                <View style={{flexDirection:'row', 'alignItems':'center'}}>
                    
                    {
                        isSupervisor ?
                        <Text p>{intern.organization?.name || "No placement yet"}</Text>
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