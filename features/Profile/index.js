import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground  } from 'react-native';
import assets from '../../constants/assets';
import { StatusBar } from 'expo-status-bar';

const ProfileScreen = () => {
    
    return (
        <View flex>
            <StatusBar translucent={true}/>
            {/* Header */}
            <ImageBackground 
                source={assets.profileHeaderBg}
                resizeMode = {"cover"}
                style={{
                    justifyContent:'center',
                    height: 300,
                }}
            >
                <Text>Sample header content</Text>
            </ImageBackground>


            {/* Form content */}
            <View>

            </View>

            {/* Call to action */}
            <View>

            </View>
        </View>
    )
}

export default ProfileScreen;
const styles = StyleSheet.create({});