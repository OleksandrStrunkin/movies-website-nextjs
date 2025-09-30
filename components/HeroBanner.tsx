import Image from "next/image";
import { useTrendingMoviesQuery } from "@/lib/hook/queries/useTrendingMoviesQuery";

export default function HeroBanner() {
  const { data: movies, isLoading, isError } = useTrendingMoviesQuery();
  const randomIndex = Math.floor(Math.random() * 10);
  const heroMovie = movies ? movies[randomIndex] : null;

  if (isLoading) {
    return <div>Завантаження банера...</div>;
  }
  if (isError || !heroMovie) {
    return <div>Не вдалося завантажити банер.</div>;
  }
  return (
    <>
      {heroMovie && (
        <section
          className="relative h-196 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie?.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-transparent to-black/100"></div>
          <div className="relative flex flex-col gap-2 md:flex-row z-10 text-center text-white px-4 w-5xl h-2xl backdrop-blur-3xl py-8 rounded-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${heroMovie.poster_path}`}
              alt={heroMovie.title}
              width={300}
              height={450}
              className="rounded-md mx-auto"
            />
            <div>
                <h2 className="text-4xl font-bold mb-4">{heroMovie.title}</h2>
                <p className="mb-6">{heroMovie.overview}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Watch now
                </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
