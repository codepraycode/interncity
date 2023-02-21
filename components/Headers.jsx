import { View, Text } from 'react-native-ui-lib';
import React from 'react';

import Avatar from './Avatar';


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