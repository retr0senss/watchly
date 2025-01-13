import React, { useEffect } from "react";
import { Stack, useNavigation, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/auth";
import { LogBox } from 'react-native';

// Disable specific warnings
LogBox.ignoreLogs([
  '[Reanimated] Reading from `value` during component render.',
]);

const RootLayout = () => {
  const navigation = useNavigation();
  const segments = useSegments();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      const isLoggedIn = !!token && !!user;
      dispatch(setUser(user));

      const authRoutes = ["login", "signup"];
      const inAuthGroup = authRoutes.includes(segments[0]);

      if (!isLoggedIn && !inAuthGroup) {
        navigation.reset({
          index: 0,
          routes: [{ name: "login/index" as never }],
        });
      } else if (isLoggedIn && inAuthGroup) {
        navigation.reset({
          index: 0,
          routes: [{ name: "index" as never }],
        });
      }
    };

    checkLoginStatus();
  }, [segments]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          autoHideHomeIndicator: true,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="signup/index" />
        <Stack.Screen name="movies/index" />
        <Stack.Screen name="tvshows/index" />
        <Stack.Screen name="movies/genres/[name]" />
        <Stack.Screen name="tvshows/genres/[name]" />
        <Stack.Screen name="search/index" />
        <Stack.Screen name="movies/[id]" />
        <Stack.Screen name="tvshows/[id]" />
      </Stack>
    </>

  );
};

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootLayout />
    </Provider>
  );
}

