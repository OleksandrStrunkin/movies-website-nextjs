"use client";
import { getMovieItem, getCast } from "@/api/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import TrailerItem from "@/components/modules/TrailerItem";
import CastItems from "@/components/modules/CastItems";

export default function CinemaDetails({ params, id }) {
  const { cinemaId } = params;
  const [item, setItem] = useState({});

  const dateObject = new Date(item.release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const result = await getMovieItem(cinemaId || id);
        console.log(result)
        setItem(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [cinemaId, setError, setItem, setLoading]);

  return (
    <div className="flex mt-5">
      <div className="">
        <Image
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          width={400}
          height={300}
          alt="poster"
          className="border-4 border-opacity-50 border-gray-500"
        />
        <div className="mb-5">
        <p className="flex gap-2 p-2 border-b-2 border-opacity-50 border-gray-500">
        <span className="opacity-50">Genres:</span>
            {item && item.genres?.map(((gen, index) => (
              <span key={gen.id}>{gen.name}{index !== item.genres.length - 1 && ', '}</span>
              
            )))}
          </p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">
            <span className="opacity-50">Duration:</span> {`${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m`}
          </p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">
            <span className="opacity-50">IMDb Rating:</span>
            {Array.from({ length: 10 }, (_, index) => (
              <span
                key={index}
                className={`text-yellow-400 ${
                  index < item.vote_average ? "" : "text-yellow-900"
                }`}
              >
                &#9733;
              </span>
            ))}
          </p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">
            <span className="opacity-50">Release Date:</span> {formattedDate}
          </p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">
            <span className="opacity-50">Country:</span>{" "}
            {item.production_countries?.[0]?.name || "N/A"}
          </p>
        </div>
      </div>
      <section className="ml-5 w-9/12">
        <div className="mb-5">
          <h1 className="text-3xl">{item.original_title || item.name}</h1>
        </div>
        <div>
          <h2 className="text-xl opacity-50">Description:</h2>
          <p className="mb-5 border-b-2 border-opacity-50 border-gray-500">
            {item.overview}
          </p>
        </div>
        <div className="mb-5">
          <TrailerItem id={cinemaId} title={item.original_title} />
          <h2 className="text-xl mb-5 opacity-50">Cast:</h2>
          <div>
            <CastItems cinemaId={cinemaId} />
          </div>
        </div>
        <div className="mb-5">
          <a
            href={item.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Visit Official Website
          </a>
        </div>
      </section>
      {loading && <p>Loading......</p>}
    </div>
  );
}
