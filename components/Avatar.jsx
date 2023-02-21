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
            source={{uri: image}}
            resizeMode="cover"
            width={80} height={80}
            style={{
                // position:'relative',
                // bottom: -20,
                borderRadius: 40,
            }}
        />
    </View>
  )
}

export default Avatar