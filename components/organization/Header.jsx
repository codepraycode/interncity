import { View, Text, Image} from 'react-native-ui-lib';
import React from 'react';
import Theme from '../../constants/theme';
import assets from '../../constants/assets';
import Seperator from '../Seperator';
import { getTimeDistance } from '../../app/utils';


export const JobDetailHeader = ({job})=>{

    return (
        <>
            <View 
                center 
                style={{
                    // backgroundColor:Theme.white,
                    paddingTop: 0,
                    zIndex:1,
                }}
            >
                <Image
                    assetName={"google"}
                    assetGroup="assets" 
                    width={70} height={70}
                    style={{
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
                >
                    {job.role}
                </Text>

                <View 
                    style={{
                        flexDirection:'row', 
                        justifyContent:'center', 
                        alignItems:'center',

                        marginVertical: 15,
                    }}
                >
                    <Text center label>
                        {job.location.city}
                    </Text>
                    <Seperator/>
                    <Text center label>{getTimeDistance(job.createdAt)}</Text>
                </View>
            </View>
        </>
    )
}

export const InternDetailHeader = ({student, school})=>{

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

                <Image
                    source={assets.user}
                    resizeMode="cover"
                    width={80} height={80}
                    style={{
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

export const PlacementHeader = ({data})=>{

    const name = `Lorem Ipsum`;
    return (
        <>
            <View 
                // centerH
                style={{
                    zIndex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:"space-evenly",
                    // marginHorizontal:20,
                    marginBottom:20,
                }}
            >

                <Image
                    source={assets.user}
                    resizeMode="cover"
                    width={65} height={65}
                />


                <Image
                    source={assets.google}
                    resizeMode="cover"
                    width={50} height={50}
                />

            </View>

            <View
                center
                style={{
                    marginHorizontal:20,                    
                    maxWidth: "90%"
                }}
            >
                <Text 
                     
                    h5
                >{name}</Text>

                <Text label>{"IT intern"}</Text>
            </View>
        </>
    )
}

export const ApplicationDetailHeader = ({application})=>{

    const student = application.student || "...";
    
    return (
        <>
            <View 
                // centerH
                style={{
                    zIndex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    marginLeft:20,
                    marginTop:20,
                }}
            >

                <Image
                    source={assets.user}
                    resizeMode="cover"
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
                    >{student?.fullname}</Text>

                    {/* <Text center label>{"IT intern"}</Text> */}
                </View>

            </View>
        </>
    )
}