import { Video } from "@/lib/types/details";

interface MovieTrailerProps {
  trailer: Video;
}

export default function MovieTrailer({trailer}: MovieTrailerProps) {
  return (
    <div className="container mx-auto mt-2">
      <h2 className="text-2xl text-end font-bold mb-4">Trailer</h2>
      <div className="relative aspect-video w-full max-w-[900px] overflow-hidden rounded-xl shadow-2xl">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&controls=1&showinfo=0&modestbranding=1`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};