import Image from "next/image";
import { Movie } from "@/lib/types/movie";

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  return (
    <>
      <li
        key={movie.id}
        className="group relative bg-card border border-border rounded-xl overflow-hidden
               flex flex-col items-center text-center shadow-sm
               hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        {/* постер */}
        <div className="relative w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={400}
            className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:blur-sm"
          />
          {/* легке затемнення при hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 rounded-xl"></div>

          <button
            title="Watch trailer"
            className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center">
              <span className="text-3xl">▶️</span>
            </div>
          </button>

          {/* блок із іконками внизу */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              title="Favorite"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition"
            >
              ❤️
            </button>
            <button
              title="Look later"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition"
            >
              🔖
            </button>
          </div>
        </div>

        {/* контент */}
        <div className="p-3 flex flex-col gap-1 w-full bg-card/90 backdrop-blur-md">
          <h3 className="text-base font-semibold text-foreground truncate">
            {movie.title}
          </h3>
          <p className="text-sm text-muted">{movie.release_date}</p>
        </div>

        {/* “Watch” або рейтинг (опціонально) */}
        <div
          className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-md
                    bg-accent/80 text-white shadow-md opacity-0 group-hover:opacity-100
                    transition-all duration-300"
        >
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </li>
    </>
  );
}
