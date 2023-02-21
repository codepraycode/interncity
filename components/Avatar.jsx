import React from 'react'
import { Image, View } from 'react-native-ui-lib'
import assets from '../constants/assets'

const Avatar = ({image, resizeMode}) => {
  return (
    <View
        center
        style={{
            zIndex: 1,
        }}
    >
      <Image
            source={image ? {uri: image} : assets.placeholder}
            resizeMode={resizeMode || "cover"}
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