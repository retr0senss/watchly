import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RelativePathString, router } from "expo-router";
import Button from "@/components/Button";
import Background from "@/components/Background";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "@/store/slices/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state.auth);

  useEffect(()=>{
    if(auth.user){
      
    }
  },[])

  const handleLogout = async () => {
    dispatch(setUser(null));
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };

  return (
    <View style={styles.container}>
      <Background />
      <View>
        <Text style={styles.title}>Watchly</Text>
        <View style={styles.buttonContainer}>
          {(auth?.user) ? <>
            <Button
              title="Movies"
              onPress={() => {
                router.push("/movies" as RelativePathString)
              }}
            />
            <Button
              title="Sign Up"
              onPress={() => {
                router.push("/tvshows" as RelativePathString)
              }}
            />
            <Button
              title="Log Out"
              onPress={handleLogout}
              color="purple"
              textColor="white"
            />
          </> : <>
            <Button
              title="Login"
              onPress={() => {
                router.push("/login" as RelativePathString)
              }}
            />
            <Button
              title="Sign Up"
              onPress={() => {
                router.push("/signup" as RelativePathString)
              }}
            />

          </>
          }
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    width: 300,
    marginTop: 50,
    gap: 20,
  },
});

export default Index;