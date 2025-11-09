import Image from "next/image";
import { getMovieDetails } from "@/lib/api/tmdb";
import MovieTrailer from "@/components/MovieTrailer";
import MovieCast from "@/components/MovieCast";
import { MovieDetailsResponse } from "@/lib/types/details";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie: MovieDetailsResponse = await getMovieDetails(params.id);

  const trailer = movie.videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (!movie) {
    return <div className="text-center text-text mt-40">Film not found 😢</div>;
  }

  return (
    <section className="min-h-screen text-foreground bg-background">
      <div className="relative w-full h-[100vh] flex items-start">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 mx-auto px-6 pb-10 mt-10 bg-card/80">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative hidden md:block max-w-[320px] aspect-[2/3] overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={320}
                height={480}
                className="object-cover"
              />
              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">
                      Production Companies:
                    </h3>
                    <div className="flex flex-col gap-1">
                      {movie.production_companies.map((company) => (
                        <div
                          key={company.id}
                          className="flex items-center gap-2"
                        >
                          {company.logo_path && (
                            <div className="relative p-4 bg-[#f9fafb]/50 border border-border rounded-xl w-full flex items-center justify-between">
                              <span className="text-sm text-foreground/80">
                                {company.name}
                              </span>
                              <Image
                                src={`https://image.tmdb.org/t/p/h60${company.logo_path}`}
                                alt={company.name}
                                width={52}
                                height={52}
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="flex-grow">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex items-center gap-4 text-sm text-foreground/80 mb-4">
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-sm">
                <div>
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </div>
                {movie.homepage && (
                  <div>
                    <strong>Homepage:</strong>{" "}
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      Visit site
                    </a>
                  </div>
                )}
                {movie.production_countries &&
                  movie.production_countries.length > 0 && (
                    <div>
                      <strong>Country:</strong>{" "}
                      {movie.production_countries.map((c) => c.name).join(", ")}
                    </div>
                  )}
              </div>
              {trailer && <MovieTrailer key={trailer.key} trailer={trailer} />}
              <p className="max-w-2xl text-foreground/80 my-6">
                {movie.overview}
              </p>
              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <MovieCast movie={movie} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
    <Image
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      fill
      className="object-cover"
    />
  </div>

  <div className="md:col-span-2 space-y-6">
    <h2 className="text-2xl font-semibold">Про фільм</h2>
    <p className="text-foreground/80 leading-relaxed">{movie.overview}</p>

    <div className="flex flex-wrap gap-4 mt-4">
      <div>
        <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
      </div>
      <div>
        <strong>Release date:</strong> {movie.release_date}
      </div>
      <div>
        <strong>Duration:</strong> {movie.runtime} хв
      </div>
    </div>
  </div>
</div>; */
}
