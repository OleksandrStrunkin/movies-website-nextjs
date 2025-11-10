import axios from "axios";

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbServerApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export async function fetchTrendingMoviesServer() {
  const { data } = await tmdbServerApi.get("/trending/movie/week");
  return data;
}
