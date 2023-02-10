import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-ui-lib';
import Theme from '../constants/theme';
import React from 'react'

const Card = ({children, clickable, unread, onPress, onLongPress}) => {
  if (clickable) return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={.7}
    >
      {children}
    </TouchableOpacity>
  )
  
  return (
    <View style={styles.cardContainer}>
      {unread && (<View style={{width:10, height:10, position:'absolute', right:9, top:9, borderRadius:5, backgroundColor:Theme.secondary}}></View>)}
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:Theme.white,
        position:'relative',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    }
})