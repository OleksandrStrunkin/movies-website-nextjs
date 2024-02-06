"use client";
import {
  getMovieItem,
  getCast,
} from "@/api/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import photoProfile from "../../../public/image/photoProfile.svg"


export default function CastItems({ cinemaId }) {

  const [cast, setCast] = useState([]);

  const [castCounter, setCastCounter] = useState(8);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const counter = () =>{
    if (castCounter === 8){
      setCastCounter(100)
    } else setCastCounter(8)
  }

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const result = await getCast(cinemaId);
        setCast(result.cast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [cinemaId, setError, setCast, setLoading]);

  return (
          <div>
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
              <button onClick={counter} className="mt-2 py-1 w-full border border-opacity-50 border-gray-500 hover:bg-slate-600 duration-300">Show more</button>
          </div>
  );
}
