import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
          autoHideHomeIndicator: true,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="movies/index" />
        <Stack.Screen name="tvshows/index" />
        <Stack.Screen name="movies/genres/[name]" />
        <Stack.Screen name="tvshows/genres/[name]" />
        <Stack.Screen name="search/index" />
        <Stack.Screen name="movies/[id]" />
        <Stack.Screen name="tvshows/[id]" />
      </Stack>
    </Provider>
  );
}

