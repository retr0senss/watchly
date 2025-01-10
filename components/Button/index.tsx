import { Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'

export default function Button({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}