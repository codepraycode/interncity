import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import Theme from '../constants/theme';
import React from 'react'

const Card = ({children, clickable, onPress}) => {
  if (clickable) return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={.7}
    >
      {children}
    </TouchableOpacity>
  )
  
  return (
    <View style={styles.cardContainer}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:Theme.white,
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    }
})