import { View, Text, Image } from 'react-native-ui-lib';
import React from 'react'
import Card from '../Card';
import assets from '../../constants/assets';
import Seperator from '../Seperator';
import { useIntern } from '../../hooks/useIntern';

const Item = ({intern:{id}, isSupervisor, onViewClick}) => {
    const { intern } = useIntern(id);

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
                        <Text p>{intern.organization?.name}</Text>
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