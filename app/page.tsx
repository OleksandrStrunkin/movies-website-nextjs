import TrendingMovies from "@/components/TrendingMovies";
import HeroBanner from "@/components/HeroBanner";
import GenresSection from "@/components/GenresSection";
import { tmdbApi, TMDB_API_KEY } from "@/lib/api/tmdb";

export default async function Home() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
    next: { revalidate: 10 },
  });

  const movies = await res.json();
  return (
    <>
      <HeroBanner movies={movies.results} />
      <TrendingMovies movies={movies.results} />
      <GenresSection />
    </>
  );
}
