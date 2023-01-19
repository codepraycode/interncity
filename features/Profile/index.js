import React from 'react'
import { View, Text } from 'react-native-ui-lib';
import { StyleSheet, ImageBackground  } from 'react-native';
import assets from '../../constants/assets';

const ProfileScreen = () => {
    return (
        <View flex>
            {/* Header */}
            <ImageBackground 
                source={{uri: assets.profileHeaderBg}}
                resizeMode = {"cover"}
                style={{
                    justifyContent:'center',
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