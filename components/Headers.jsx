import { View, Text } from 'react-native-ui-lib';
import React from 'react';

import Avatar from './Avatar';
import Theme from '../constants/theme';


export const MiniDetailHeader = ({student, job})=>{
    
    return (
        <>
            <View 
                // centerH
                style={{
                    zIndex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    marginLeft:20,
                    marginVertical:20,
                }}
            >

                <Avatar
                    image={student?.avatar}
                    width={65} height={65}
                />

                <View
                    style={{
                        marginLeft:10,
                    }}
                >
                    <Text 
                        center 
                        h4
                    >{student?.fullname || '...'}</Text>

                    {
                        job && (
                            <Text center h6>
                                {job.role || "..."}
                            </Text>
                        )
                    }
                </View>

            </View>
        </>
    )
}

export const MiniDetailHeader2 = ({student, school})=>{

    const name = student?.fullname || '...';
    const schoolName = school?.name || '...';

    return (
        <>
            <View 
                center
                style={{
                    zIndex:1,
                }}
            >

                <Avatar
                    image={student?.avatar}
                    imageStyle={{
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
                    {/* <Text center label>{"IT intern"}</Text> */}
                    <Text center small>{schoolName}</Text>
                </View>
            </View>
        </>
    )
}