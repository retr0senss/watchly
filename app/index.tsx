import React from "react";
import { Redirect, router } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "@/store/slices/auth";
import { useDispatch } from "react-redux";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Background from "@/components/Background";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";

export default () => {
  const [isCompiled, setIsCompiled] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        dispatch(setUser(storedUser));
      }
      setIsCompiled(true);
    }

    checkLoginStatus();
  }, []);

  if (!isCompiled) return null;

  return (auth.user ? <Redirect href="/home" /> : < >
    <Background />
    <LinearGradient
      colors={['rgba(0,0,0,.9)', 'rgba(0, 0, 0, .9)', 'rgba(0, 0, 0, .9)', 'rgba(0, 0, 0, 1)', 'rgba(0,0,0,.1)']}
      start={[0, 1]}
      end={[0, 0]}
      locations={[0, 0.2, 0.35, 0.4, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} >Watchly</Text>
          <Text style={styles.description}>
            Get ready to dive into the world of movies and TV shows
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => {
            router.push('/login');
          }} color="rgb(63,85,198)" textColor="white" />
          <Button title="Sign Up" onPress={() => {
            router.push('/signup');
          }} color="rgb(32,31,37)" textColor="white" />
          {/* <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?
            </Text>
            <Pressable>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
          </View> */}
        </View>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By creating an account or signing in, you are agreeing to our <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  </>);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    gap: 30
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'column',
    gap: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  signUpText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
  },
  signUpLink: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  termsText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
  },
  termsLink: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});