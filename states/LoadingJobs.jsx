import React from 'react';
import { View, Text, Image } from 'react-native-ui-lib';
import Theme from '../constants/theme';

const LoadingJobs = ({isOrganization}) => {
    return (
        <View 
            center 
            style={{
                height:650,
            }}
        >
            <Image 
                assetName="logo" 
                assetGroup="assets" 
                width={100} 
                height={50}
                style={{
                    opacity: 0.5,
                    marginBottom: 10,
                }}
            />

            <Text p center style={{width: 250}}>

                {
                    isOrganization ? 
                    <Text>Loading your jobs...</Text>
                    :
                    <Text>Loading jobs...</Text>
                }
                
            </Text>
        </View>
    )
}

export default LoadingJobs;
