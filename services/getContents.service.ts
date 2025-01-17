import axios from "axios";
import { GenreInterface } from "@/interfaces/contentInterfaces";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export async function getPopulars(type: string, page: number = 1) {
  try {
    return await axios.get(
      `${apiUrl}/discover/${type}?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );
  } catch (err) {
    console.log(`${apiUrl}/discover/${type}?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`)
    console.log("Error: ", err);
  }
}

export async function getTopRated(type: string, page: number = 1) {
  try {
    return await axios.get(
      `${apiUrl}/${type}/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
    );
  } catch (err) {
    console.error(err);
  }
}

export async function getPopularsOfGenreList(
  type: string,
  genres: GenreInterface[],
  page: number = 1,
  sort: string = "popularity.desc"
) {
  const title = type === "movie" ? "Movies" : "Tv Shows";
  try {
    const genresRails = await Promise.all(
      genres.map(async (genre) => {
        const res = await axios.get(
          `${apiUrl}/discover/${type}?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${genre.id}&sort_by=${sort}&vote_count.gte=1000`
        );
        return { title: `${genre.name} ${title}`, data: res.data.results };
      })
    );

    return genresRails;
  } catch (error) {
    console.error(error);
  }
}
