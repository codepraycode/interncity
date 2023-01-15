import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import Theme from '../constants/theme';
import React from 'react'

const Card = ({children}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>Sample card content</Text>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:Theme.white,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
    }
})