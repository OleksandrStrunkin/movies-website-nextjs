import Image from "next/image";
import { Movie } from "@/lib/types/movie";

interface HeroBannerProps {
  movies: Movie[];
}

export default function HeroBanner({ movies }: HeroBannerProps) {
  console.log(movies);
  const randomIndex = Math.floor(Math.random() * 10);
  const heroMovie = movies ? movies[randomIndex] : null;
  return (
    <>
      {heroMovie && (
        <section
          className="relative h-196 bg-cover flex items-center justify-center 
             md:[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-md pointer-events-none" />
          <div
            className="relative z-20 flex flex-col md:flex-row items-center gap-6 
                    bg-card/70 backdrop-blur-2xl border border-border
                    rounded-2xl shadow-2xl p-4 md:p-6 w-[90%] md:w-4xl
                    text-foreground"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${heroMovie.poster_path}`}
              alt={heroMovie.title}
              width={280}
              height={420}
              className="rounded-lg shadow-lg hidden md:block"
            />

            <div className="flex flex-col text-center md:text-left max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-foreground">
                {heroMovie.title}
              </h2>
              <div className="flex justify-center md:justify-start items-center gap-4 mb-3 text-muted">
                <span>{heroMovie.release_date}</span>
                <span className="px-2 py-1 rounded-md bg-accent/20 text-accent font-semibold">
                  ⭐ {heroMovie.vote_average}
                </span>
              </div>
              <p className="text-lg leading-relaxed mb-8 text-muted line-clamp-5">
                {heroMovie.overview}
              </p>
              <button
                className="self-center md:self-start bg-accent hover:bg-accent-hover 
                     text-white font-semibold py-3 px-6 rounded-lg shadow-md 
                     transition-all duration-300"
              >
                🎬 Watch Trailer
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

//  <section
//           className={`relative h-196 bg-cover flex items-center justify-center mask-alpha mask-b-from-black mask-b-from-20% mask-b-to-transparent`}
//           style={{
//             backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie?.backdrop_path})`,
//           }}
