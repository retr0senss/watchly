import { Keyboard, Pressable, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from './styles'

const Input = ({ value, onChangeText, placeholder }: { value: string, onChangeText: (text: string) => void, placeholder: string }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
      />
      {value?.length > 0 && <Pressable style={styles.clearButton} onPress={() => {
        Keyboard.dismiss()
        onChangeText('')
      }}>
        <Text style={styles.clearText}>X</Text>
      </Pressable>}
    </View >
  )
}

export default Input