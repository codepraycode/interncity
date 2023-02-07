import { View, Text, Image} from 'react-native-ui-lib';
import React from 'react';
import Theme from '../../constants/theme';
import assets from '../../constants/assets';
import Octicons from 'react-native-vector-icons/Octicons';
import Seperator from '../Seperator';


const DetailHeader = ({data})=>{

    const name = `Lorem Ipsum`;
    const school = "Federal University of Technology Akure"

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
                >Backend Intern</Text>

                <View 
                    style={{
                        flexDirection:'row', 
                        justifyContent:'center', 
                        alignItems:'center',

                        marginVertical: 15,
                    }}
                >
                    <Text center label>Ikeja</Text>
                    <Seperator/>
                    <Text center label>2 days ago</Text>
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

export default DetailHeader;