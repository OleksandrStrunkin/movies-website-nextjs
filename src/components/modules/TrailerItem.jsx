"use client";
import { getMovieTrailer } from "@/api/movies";
import { useEffect, useState } from "react";

export default function TrailerItem({ id, title }) {
  const [trailers, setTrailers] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [visibleLists, setVisibleLists] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleVisibility = (type) => {
    setVisibleLists(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(key => {
        if (key !== type) {
          newState[key] = false;
        }
      });
      newState[type] = !prevState[type];
      return newState;
    });
  };

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const resultTrailer = await getMovieTrailer(id);
        setTrailers(resultTrailer.videos.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [id, setError, , setLoading]);

  const embedUrl = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo}`
    : `https://www.youtube.com/embed/${trailers?.[0]?.key}`;

  const changeVideo = (videoKey, type) => {
    setSelectedVideo(videoKey);
    toggleVisibility(type);
  };

  const uniqueTypes = Array.from(
    new Set(trailers?.map((trailer) => trailer.type))
  );

  return (
    <div className="mb-5 pb-1 overflow-y-hidden flex flex-col items-start justify-between border-b-2 border-opacity-50 border-gray-500">
      <div className="flex gap-4">
      {uniqueTypes &&
        uniqueTypes.map((type) => (
          <div key={type} className="relative z-10 mb-2 px-4 py-1 rounded-full flex border border-opacity-50 border-slate-300 hover:bg-slate-600 duration-300">
            <h2 className="text-lg font-bold cursor-pointer" onClick={() => toggleVisibility(type)}>
              {type}
            </h2>
            {visibleLists[type] && (
              <ul className="absolute rounded-xl left-0 top-10 w-max border bg-slate-500 animate-slide-down">
                {trailers
                  .filter((trailer) => trailer.type === type)
                  .map((filteredTrailer) => (
                    <li
                      key={filteredTrailer.id}
                      className="p-1 rounded-xl border border-opacity-50 border-gray-500 bg-slate-800 cursor-pointer hover:bg-slate-700"
                      onClick={() => changeVideo(filteredTrailer.key, type)}
                    >
                      <div>
                        <p className="text-xm">{filteredTrailer.name}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
    </div>
      {trailers && trailers.length > 0 && <div>
        <h2 className="text-xl opacity-50">Trailer:</h2>
        <iframe
          width="760"
          height="515"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>}
    </div>
  );
}
