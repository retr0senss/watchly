import { View, Text, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '@/components/Background';
import { StatusBar } from 'expo-status-bar';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import Button from '@/components/Button';
import { signUp } from '@/services/authServices.service';
import { ERRORS } from '@/utils/errorMessages';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (token && user) {
        dispatch(setUser(user));
        router.push('/');
      }
    };
    checkAuth();
  }, []);

  const handleSignUp = async () => {
    try {
      const res = await signUp(email, password);
      if (res.status === 200) {
        Alert.alert("Sign Up Success", "You have successfully signed up");
        dispatch(setUser(res.data.email));
        await AsyncStorage.setItem('user', res.data.email);
        await AsyncStorage.setItem('token', res.data.idToken);
        router.push('/'); // Redirect to home page
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Sign Up Error", ERRORS[error.message as keyof typeof ERRORS] || "An unknown error occurred");
        if (error.message === 'EMAIL_EXISTS') {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          router.push('/login');
        }
      } else {
        Alert.alert("Sign Up Error", "An unknown error occurred");
      }
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
            <Text style={styles.title}>Sign Up</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} color='rgb(63,85,198)' textColor='#FFFFFF' />
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}>Log In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignUp;

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
    color: 'black',
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
  loginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  loginText: {
    color: 'black',
    textAlign: 'center',
  },
  loginLink: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});