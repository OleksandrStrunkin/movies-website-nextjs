import Image from "next/image";
import { MovieDetailsResponse } from "@/lib/types/details";

interface MovieCastProps {
  movie: MovieDetailsResponse;
}

export default function MovieCast({ movie }: MovieCastProps) {
    return (
      <div className="container">
        <h2 className="text-2xl font-bold text-end mb-6">Top Billed Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {movie.credits.cast.slice(0, 8).map((actor) => (
            <div
              key={actor.cast_id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-full md:w-[60%] aspect-square overflow-hidden mb-2 bg-foreground/10">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-foreground/50">
                    No Photo
                  </div>
                )}
              </div>
              <p className="font-semibold text-sm leading-tight">
                {actor.name}
              </p>
              <p className="text-xs text-foreground/70">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    );
};