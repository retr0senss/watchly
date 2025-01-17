import { ImageBackground } from 'react-native'
import React from 'react'
import styles from './styles'

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const Background = ({ imageUrl, setIsLoaded }: {
  imageUrl?: string,
  setIsLoaded?: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  return (
    <ImageBackground
      source={imageUrl ? { uri: `${ImageBaseUrl}${imageUrl}` } : require("@/assets/images/homeBG.jpg")
      }
      style={styles.bgImage}
      blurRadius={imageUrl ? 50 : 0}
      onLoad={() => setIsLoaded && setIsLoaded(true)}
    />
  )
}

export default Background