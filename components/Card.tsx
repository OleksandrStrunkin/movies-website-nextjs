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
        className="bg-gray-700/20 rounded-lg text-white flex flex-col items-center max-w-[300px] mx-auto"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={350}
          className="inline-block rounded"
        />
        <h3 className="text-sm font-semibold mt-2 overflow-hidden truncate w-40 text-center">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-300 mb-2">{movie.release_date}</p>
      </li>
    </>
  );
}
