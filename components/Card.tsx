import Image from "next/image";
import { Movie } from "@/lib/types/movie";

interface CardProps {
  movie: Movie;
  genres?: { id: number; name: string }[];
}

export default function Card({ movie, genres }: CardProps) {
  const genresNames = movie.genre_ids
    .slice(0, 2)
    .map((id) => genres?.find((g) => g.id === id)?.name)
    .filter((name) => !!name)
    .join(", ");
  return (
    <>
      <li
        key={movie.id}
        className="group relative bg-card border border-border rounded-xl overflow-hidden
               flex flex-col items-center text-center shadow-sm
               hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-full overflow-hidden rounded-t-xl cursor-pointer bg-card aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="absolute inset-0 object-cover group-hover:blur-sm group-hover:brightness-50 transition-all duration-300"
            fill={true}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <button
            title="Watch trailer"
            className="absolute inset-0 flex items-center justify-center text-white opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-accent/30 hover:bg-accent-hover flex items-center justify-center transition-all duration-300">
              <span className="text-3xl">▶️</span>
            </div>
          </button>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 opacity-0 cursor-pointer group-hover:opacity-100 transition-all duration-300">
            <button
              title="Favorite"
              className="p-2 rounded-full bg-accent/30 hover:bg-accent-hover cursor-pointer transition-all duration-300"
            >
              ❤️
            </button>
            <button
              title="Look later"
              className="p-2 rounded-full bg-accent/30 hover:bg-accent-hover cursor-pointer transition-all duration-300"
            >
              🔖
            </button>
          </div>
        </div>
        <div className="p-2 flex flex-col text-start gap-1 w-full bg-card/90">
          <h3 className="text-xs text-foreground truncate">{movie.title}</h3>
          <div className="flex gap-1 items-">
            <span className="text-xs text-foreground">
              {movie.release_date.slice(0, 4)}
            </span>
            <span className="text-xs text-foreground/80 truncate">
              {genresNames}
            </span>
          </div>
        </div>
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
