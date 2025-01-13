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
    <View>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Entypo onPress={() => router.back()} name="chevron-left" size={24} color="white" style={styles.backButton} />
        {isHomePage && (
          <>
            <Text style={styles.title}>{title ?? "Watchly"}</Text>
            <Feather name="search" size={24} color="white" onPress={() => router.push('/search' as RelativePathString)} style={styles.searchButton} />
          </>
        )}
        {isSearchPage && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={placeHolder}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={Keyboard.dismiss}
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            />
            {(value && value.length > 0) && onChange && (
              <Pressable style={styles.clearButton} onPress={() => {
                Keyboard.dismiss();
                onChange('');
              }}>
                <Text style={styles.clearText}>X</Text>
              </Pressable>
            )}
          </View>
        )}
        {isGenrePage && (
          <View style={styles.genreButtonsContainer}>
            {gridView ? (
              <Entypo name="list" size={24} color="white" onPress={() => setGridView && setGridView(!gridView)} />
            ) : (
              <Entypo name="grid" size={24} color="white" onPress={() => setGridView && setGridView(!gridView)} />
            )}
            {openModal && <Feather name="filter" size={24} color="white" onPress={() => { openModal(true) }} />}
          </View>
        )}
      </View>
    </View>
  );
}
