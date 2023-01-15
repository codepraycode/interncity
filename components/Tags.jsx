import { StyleSheet } from 'react-native';
import { View,Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';
import React from 'react'

const Tags = ({text}) => {
  return (
    <View style={styles.cardContainer}>
      <Text p center>{text}</Text>
    </View>
  )
}

export default Tags;

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:Theme.grey100,
        // marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 90,
    }
})