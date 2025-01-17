import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePathname } from 'expo-router';
import styles from './styles';


export default function Header() {
  const pathname = usePathname();
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>{pathname === "/search" ? "Search" : "Watchly"}</Text>
      </View>
    </>
  );
}
