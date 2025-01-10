import { MovieInterface, TvShowInterface } from "@/interfaces/contentInterfaces";

export const createGenreRoute = (genre: string) => {
  return genre
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/ /g, '-')
    .replace(/tv-shows/g, '')
    .replace(/movies/g, '')
    .replace(/-$/, ''); // Remove trailing hyphen
};

export const orderByPopularity = (data:MovieInterface[] | TvShowInterface[])=>{
  return data.sort((a: MovieInterface | TvShowInterface, b: MovieInterface | TvShowInterface) => b?.popularity - a?.popularity);
}