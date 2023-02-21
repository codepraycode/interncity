import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState} from 'react'
import { Image, View } from 'react-native-ui-lib'
import { storageRef } from '../app/firebaseConfig';
import assets from '../constants/assets'
import { boxShadow } from '../constants/typography';

const Avatar = ({image:imagePath, resizeMode, width, height, imageStyle}) => {
  const [image, setImage] = useState(null);

  useEffect(()=>{
    (
      ()=>{
        if(!imagePath) return
        if (imagePath.includes("file:")) return setImage(imagePath);
        getDownloadURL(ref(storageRef, imagePath))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setImage(url);
      })
      .catch((error) => {
        // Handle any errors
        console.log("Could not get image", error);
      })}
    )()
  },[image, imagePath])

  return (
    <View
        center
        style={{
            zIndex: 1,
            ...boxShadow
        }}
    >
      <Image
            source={image ? {uri: image} : assets.placeholder}
            resizeMode={resizeMode || "cover"}
            width={width || 80} height={height || 80}
            style={{
                borderRadius: 40,
                ...(imageStyle || {})
            }}
        />
    </View>
  )
}

export default Avatar