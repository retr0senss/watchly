import { ImageBackground } from 'react-native'
import React from 'react'
import styles from './styles'

const Background = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/homeBG.png")}
      style={styles.bgImage}
    />
  )
}

export default Background