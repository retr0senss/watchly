import { View, Text, StyleSheet, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '@/components/Background';
import { StatusBar } from 'expo-status-bar';
import Entypo from '@expo/vector-icons/Entypo';
import { router, useNavigation } from 'expo-router';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/services/authServices.service';
import { setUser } from '@/store/slices/auth';
import { ERRORS } from '@/utils/errorMessages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (token && user) {
        dispatch(setUser(user));
        navigation.reset({
          index: 0,
          routes: [{ name: "index" as never }],
        });
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res?.status === 200) {
        dispatch(setUser(res.data.email));
        await AsyncStorage.setItem('user', res.data.email);
        await AsyncStorage.setItem('token', res.data.idToken);
        navigation.reset({
          index: 0,
          routes: [{ name: "index" as never }],
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Login Error", ERRORS[error.message as keyof typeof ERRORS] || "An unknown error occurred");
        if (error.message === 'EMAIL_NOT_FOUND') {
          setEmail('');
          setPassword('');
          navigation.reset({
            index: 0,
            routes: [{ name: "index" as never }],
          });
        }
      } else {
        Alert.alert("Login Error", "An unknown error occurred");
      }
    }
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <StatusBar hidden />
      <Background />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Entypo name="chevron-left" size={24} color="white" />
          </Pressable>
          <View style={styles.formCard}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Pressable style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
            <Button title="Login" onPress={handleLogin} color='#6200EE' textColor='#FFFFFF' />
          </View>
        </View>
      </TouchableWithoutFeedback >
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  formCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 32,
    height: 32,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6200EE',
    fontSize: 14,
  },
});