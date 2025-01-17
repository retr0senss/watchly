import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        autoHideHomeIndicator: true,
        contentStyle: { backgroundColor: '#1b1f28 ' },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
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

