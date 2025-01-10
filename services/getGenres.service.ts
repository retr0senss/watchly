import axios from "axios";


const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export async function getGenres({type}:{type:string}) {
  try {
    return await axios.get(`${apiUrl}/genre/${type}/list?api_key=${apiKey}`);
  } catch (err) {
    console.error(err);
  }
}