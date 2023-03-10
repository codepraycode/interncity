import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState} from 'react'
import { Image, View } from 'react-native-ui-lib'
import { storageRef } from '../app/firebaseConfig';
import assets from '../constants/assets'
import { boxShadow } from '../constants/typography';

const Avatar = ({image:imagePath, resizeMode, width:givenWidth, height:givenHeight, imageStyle}) => {
  const [image, setImage] = useState(null);

  const width = givenWidth || 80;
  const height = givenHeight || 80;
  const radius = Math.max(width, height)/2;

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
            width={width} height={height}
            style={{
                borderRadius: radius,
                ...(imageStyle || {})
            }}
        />
    </View>
  )
}

export default Avatar