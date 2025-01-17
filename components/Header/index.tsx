import React from 'react';
import { View, Text, TextInput, Keyboard, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RelativePathString, router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import styles from './styles';

interface HeaderProps {
  isHomePage?: boolean;
  isSearchPage?: boolean;
  value?: string;
  placeHolder?: string;
  onChange?: (text: string) => void;
  title?: string;
  isGenrePage?: boolean;
  gridView?: boolean;
  setGridView?: (value: boolean) => void;
  openModal?: (value: boolean) => void;
}

export default function Header(
  {
    isHomePage,
    isSearchPage,
    value,
    placeHolder,
    onChange,
    title,
    isGenrePage,
    gridView,
    setGridView,
    openModal
  }
    :
    HeaderProps) {

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>Watchly</Text>
      </View>
    </>
  );
}
