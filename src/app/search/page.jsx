"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useSearchParams } from 'next/navigation'
import { getSearchMovies } from "@/api/movies";

export default function Search() {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const SearchMovies = async () => {
      setLoading(true);
      try {
        const result = await getSearchMovies(search);
        setItems(result.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
      SearchMovies();
  }, [search])
  return (
    <>
      <h1 className="text-center">Search result</h1>
      <ul className="w-full h-full grid grid-cols-1 bg-slate-500">
        {items &&
          items.map((item) => (
            <li
              className="flex border border-gray-300 p-2 rounded-md bg-slate-600"
              key={item.id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={80}
                height={50}
                alt="poster"
                className="border-4 border-opacity-50 border-gray-500"
              />
              <div>
                <p className="px-2 py-1 text-xm">
                  {item.original_title || item.name}
                </p>
                <p className="px-2 py-1 text-xs opacity-50">
                  IMDb Rating:<span className="pl-2">{item.vote_average}</span>
                </p>
                <p className="px-2 py-1 text-xs opacity-50">
                  {item.release_date.split("-")[0]}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
