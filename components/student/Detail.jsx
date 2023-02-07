import { View, Text, Image} from 'react-native-ui-lib';
import React from 'react';
import Theme from '../../constants/theme';
import assets from '../../constants/assets';
import Octicons from 'react-native-vector-icons/Octicons';


const DetailHeader = ({data})=>{

    const name = `Lorem Ipsum`;
    const school = "Federal University of Technology Akure"

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
                    <Text center label>{"IT intern"}</Text>
                    <Text center label>{school}</Text>
                </View>
            </View>

            <View
                center
            >
                <View
                    center
                    style={{
                        flexDirection:'row',
                        backgroundColor:Theme.lightRed,
                        maxWidth: "80%",
                        paddingHorizontal: 20,
                        paddingVertical:10,
                        borderRadius: 6,
                        marginVertical: 10,
                    }}
                >
                    <Octicons name="link-external" size={15} color={Theme.red}/>

                    <Text style={{marginLeft: 10, color:Theme.red}}>
                        View CV
                    </Text>
                </View>
                
            </View>
        </>
    )
}



export const DetailHeaderMini = ({data})=>{

    const name = `Lorem Ipsum`;
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
                    >{name}</Text>

                    <Text center label>{"IT intern"}</Text>
                </View>

            </View>
        </>
    )
}

export default DetailHeader;