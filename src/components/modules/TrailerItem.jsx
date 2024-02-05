"use client";
import { getMovieTrailer } from "@/api/movies";
import { useEffect, useState } from "react";

export default function TrailerItem({ id, title }) {
  const [trailers, setTrailers] = useState(null);

  const [visibleLists, setVisibleLists] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleVisibility = (type) => {
    setVisibleLists((prevLists) => ({
      ...prevLists,
      [type]: !prevLists[type],
    }));
  };

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const resultTrailer = await getMovieTrailer(id);
        console.log("trailer", resultTrailer.videos.results);
        setTrailers(resultTrailer.videos.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [id, setError, , setLoading]);

  const embedUrl = `https://www.youtube.com/embed/${trailers?.[11]?.key}`;

  const uniqueTypes = Array.from(
    new Set(trailers?.map((trailer) => trailer.type))
  );

  return (
    <div className="relative mb-5 flex items-start justify-between">
      <div>
      {uniqueTypes &&
        uniqueTypes.map((type) => (
          <div key={type} className="mb-2 flex w-full justify-between border border-opacity-50 border-gray-500">
            <h2 className="text-lg font-bold cursor-pointer" onClick={() => toggleVisibility(type)}>
              {type}
            </h2>
            {visibleLists[type] && (
              <ul className="bottom-1">
                {trailers
                  .filter((trailer) => trailer.type === type)
                  .map((filteredTrailer) => (
                    <li
                      key={filteredTrailer.id}
                      className="p-1 border border-opacity-50 border-gray-500 bg-slate-800 "
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
      <div>
        <h2 className="text-2xl">Trailer:</h2>
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
