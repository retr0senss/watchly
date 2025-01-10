import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export async function searchTvShows(search: string) {
  try {
    return await axios.get(`${apiUrl}/search/tv?api_key=${apiKey}&query=${search}&include_adult=false`);
  } catch (err) {
    console.error(err);
  }
}

export async function searchMovies(search: string) {
  try {
    return await axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${search}&include_adult=false`);
  } catch (err) {
    console.error(err);
  }
}

export async function searchMulti(search: string) {
  try {
    return await axios.get(`${apiUrl}/search/multi?api_key=${apiKey}&query=${search}&include_adult=false`);
  } catch (err) {
    console.error(err);
  }
}