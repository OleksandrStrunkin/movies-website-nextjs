"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { getSearchMovies } from "@/api/movies";

export default function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ascending, setAscending] = useState(true);

  const sortByYear = () => {
    const sortedItems = [...items].sort((a, b) => {
      const yearA = parseInt(a.release_date.split("-")[0]);
      const yearB = parseInt(b.release_date.split("-")[0]);
      return ascending ? yearA - yearB : yearB - yearA;
    });
    setItems(sortedItems);
    setAscending(!ascending);
  };

  useEffect(() => {
    const searchMovies = async () => {
      setLoading(true);
      try {
        const result = await getSearchMovies(search);
        setItems(result.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [search]);

  return (
    <>
      <h1 className="text-center text-2xl my-4">
        Search result<span className="ml-2">"{search}"</span>
      </h1>
      <div className="flex mb-4">
        <button
          onClick={sortByYear}
          className="bg-slat-500 hover:bg-slat-700 text-white font-bold py-2 px-4 rounded"
        >
        Year {ascending ? '▼' : '▲'}
        </button>
      </div>
      <ul className="grid grid-cols-6 gap-2">
        {items &&
          items.map((item) => (
            <li
              className="w-full min-h-max overflow-hidden border border-gray-300 rounded-md"
              key={item.id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={192}
                height={80}
                alt="poster"
                className="w-max h-max object-cover"
              />

              <div>
                <p className="px-2 py-1 text-xm whitespace-nowrap overflow-hidden overflow-ellipsis">
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
