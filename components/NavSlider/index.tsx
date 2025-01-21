import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { router, RelativePathString, usePathname } from 'expo-router'
import styles from './styles'

const NavSlider = () => {
  const pathname = usePathname();
  const navData = [
    { key: 'Home', path: '/home' },
    { key: 'Movies', path: '/movies' },
    { key: 'Shows', path: '/tvshows' },
  ]

  return (
    <FlatList
      data={navData}
      renderItem={({ item }) => (
        <Pressable style={pathname === item.path ? styles.selectedButton : null} onPress={() => router.push(item.path as RelativePathString)}>
          <Text style={styles.buttonText}>{item.key}</Text>
        </Pressable>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.buttonContainer}
      style={{ flexGrow: 0, flexShrink: 0 }}
    />
  )
}

export default NavSlider