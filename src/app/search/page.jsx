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
    };
    SearchMovies();
  }, [search]);
  return (
    <>
      <h1 className="text-center text-2xl my-4">
        Search result<span className="ml-2">"{search}"</span>
      </h1>
      <ul className="grid grid-cols-6 gap-2">
        {items &&
          items.map((item) => (
            <li
              className="w-full grow min-h-max overflow-hidden border border-gray-300 rounded-md"
              key={item.id}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={192}
                height={80}
                alt="poster"
                className="w-max object-fill"
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
