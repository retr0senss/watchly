import React, { useEffect } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RelativePathString, router } from "expo-router";
import Button from "@/components/Button";
import Background from "@/components/Background";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "@/store/slices/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "@/components/Header";
import { usePathname } from "expo-router";
import NavSlider from "@/components/NavSlider";

const Index = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state.auth);
  const pathname = usePathname();

  useEffect(() => {
    if (auth.user) {

    }
  }, [])

  const handleLogout = async () => {
    dispatch(setUser(null));
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };



  return (
    <>
      <Header />
      <View style={styles.container}>
        <NavSlider />
      </View >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 30,
    height: 70,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgb(62, 84, 199)',
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Index;