import React from 'react'
import { Image, View } from 'react-native-ui-lib'

const Avatar = ({image}) => {
  return (
    <View
        center
        style={{
            zIndex: 1,
        }}
    >
      <Image
            source={image}
            resizeMode="cover"
            width={80} height={80}
            // style={{
            //     position:'relative',
            //     bottom: -20,
            // }}
        />
    </View>
  )
}

export default Avatar