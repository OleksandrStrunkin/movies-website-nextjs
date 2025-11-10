import TrendingMovies from "@/components/TrendingMovies";
import HeroBanner from "@/components/HeroBanner";
import GenresSection from "@/components/GenresSection";
import { fetchTrendingMoviesServer } from "@/lib/api/trendingMovie"; 

export default async function Home() {
  const movies = await fetchTrendingMoviesServer();
  return (
    <>
      <HeroBanner movies={movies.results} />
      <TrendingMovies movies={movies.results} />
      <GenresSection />
    </>
  );
}
