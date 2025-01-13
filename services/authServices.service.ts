import axios from "axios";

const firebaseUrl = process.env.EXPO_PUBLIC_FIREBASE_URL;
const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

export async function signUp(email: string, password: string) {
  try {
    return await axios.post(`${firebaseUrl}signUp?key=${firebaseApiKey}`, {
      email,
      password,
      returnSecureToken: true,
    });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data.error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function login(email: string, password: string) {
  try {
    return await axios.post(
      `${firebaseUrl}signInWithPassword?key=${firebaseApiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error("Error message:", err.response.data.error.message);
      console.error("Error code:", err.response.status);
    } else {
      console.error(err);
    }
  }
}
