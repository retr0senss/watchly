import { GenreInterface } from "@/interfaces/contentInterfaces";
import { getPopulars, getPopularsOfGenreList, getTopRated } from "@/services/getContents.service";

export async function getDashboardData(type: string, genres: GenreInterface[]) {
  const title = type === 'movie' ? 'Movies' : 'Tv Shows';

  try {
    const [popularRes, topRatedRes, popularGenresData] = await Promise.all([
      getPopulars(type),
      getTopRated(type),
      getPopularsOfGenreList(type, genres)
    ]);

    const popularData = popularRes?.data?.results || [];
    const topRatedData = topRatedRes?.data?.results || [];
    const genreData = Array.isArray(popularGenresData) ? popularGenresData : [];

    return [
      { title: `Popular ${title}`, data: popularData },
      { title: `Top Rated ${title}`, data: topRatedData },
      ...genreData
    ];
  } catch (err) {
    console.error(err);
    return [];
  }
}