"use client";
import {
  getMovieItem,
  getCast,
  getMovieVideo,
  getMovieTrailer,
} from "@/api/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import photoProfile from "../../../../public/image/photoProfile.svg";
import TrailerItem from "@/components/modules/TrailerItem";


export default function CinemaDetails({ params }) {
  const { cinemaId } = params;
  const [item, setItem] = useState({});

  const [cast, setCast] = useState([]);

  const [castCounter, setCastCounter] = useState(8);

  const dateObject = new Date(item.release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const counter = () =>{
    if (castCounter === 8){
      setCastCounter(100)
    } else setCastCounter(8)
  }

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const result = await getMovieItem(cinemaId);
        console.log('getmovie', result)
        setItem(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [cinemaId, setError, setItem, setLoading]);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const result = await getCast(cinemaId);
        setCast(result.cast);
        console.log('getmovie', result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [cinemaId, setError, setCast, setLoading]);

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
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">Duration: {item.runtime} mins</p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">IMDb Rating: {item.vote_average}</p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">Release Date: {formattedDate}</p>
          <p className="p-2 border-b-2 border-opacity-50 border-gray-500">Country: {item.production_countries?.[0]?.name || "N/A"}</p>
        </div>
      </div>
      <section className="ml-5 w-9/12">
        <div className="mb-5">
          <h1 className="text-3xl">{item.original_title || item.name}</h1>
        </div>
        <div>
          <h2 className="text-2xl">Description:</h2>
          <p className="mb-5">{item.overview}</p>
        </div>
        <div className="mb-5">
          <TrailerItem id={cinemaId} title={item.original_title}/>
          <h2 className="text-2xl mb-2">Cast:</h2>
          <ul className="grid grid-cols-4 gap-1">
            {cast &&
              cast.slice(0, castCounter).map((actor) => (
                <li key={actor.id} className="flex items-center gap-2 w-full border border-opacity-50 border-gray-500 bg-slate-800 hover:bg-slate-700 cursor-pointer duration-300">
                  <Image
                    src={
                      actor.profile_path
                        ? `https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`
                        : photoProfile
                    }
                    width={80}
                    height={90}
                    alt={`${actor.name}`}
                  />
                  <div>
                    <p className="text-xm">{actor.name}</p>
                    <p className="text-xs">{actor.character}</p>
                  </div>
                </li>
              ))}
          </ul>
          <button onClick={counter} className="mt-2 w-full border border-opacity-50 border-gray-500">Show more</button>
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
