import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("NEXT_PUBLIC_TMDB_API_KEY не встановлено. Перевір файл .env");
}

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/week");
  return response.data.results;
};
