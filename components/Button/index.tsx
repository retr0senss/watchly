import { Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'

export default function Button({ title, onPress, color, textColor }: { title: string, onPress: () => void, color?: string, textColor?: string }) {
  return (
    <Pressable style={[{
      backgroundColor: color || 'white',
    }, styles.button]} onPress={onPress}>
      <Text style={[{
        color: textColor || 'black',
      }, styles.text]}>{title}</Text>
    </Pressable>
  )
}