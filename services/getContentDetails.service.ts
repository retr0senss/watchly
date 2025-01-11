import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export async function getContentDetails(type: string, id: string) {
  try {
    return await axios.get(
      `${apiUrl}/${type}/${id}?api_key=${apiKey}&append_to_response=credits%2Cvideos%2Csimilar&language=en-US`
    );
  } catch (err) {
    console.error(err);
  }
}
