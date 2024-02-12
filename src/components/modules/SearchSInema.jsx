"use client";
import { useEffect, useState } from "react";
import { getSearchMovies } from "../../api/movies";
import Image from "next/image";

export default function SearchSinema() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await getSearchMovies(searchTerm);
      setItems(result.results);
      console.log(items);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="ml-4 relative">
        <div className="">
          <input
            type="text"
            placeholder="Enter movie title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white bg-transparent border border-slate-500 p-1 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-slate-500 text-white px-4 py-1 rounded-md"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading......</p>}
        {error && <p>Error: {error.message}</p>}
        {items && items.length > 0 ? (
          <ul className="absolute w-full h-full flex flex-col bg-slate-500 z-10">
            <li>Ось пошук</li>
            {items.map((item) => (
              <li
                className="flex border border-gray-300 p-2 rounded-md"
                key={item.id}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  width={100}
                  height={50}
                  alt="poster"
                  className="border-4 border-opacity-50 border-gray-500"
                />
                <div>
                  <p className="p-2 text-xl">{item.original_title || item.name}</p>
                  <p className="p-2 text-xm opacity-50">IMDb Rating:{item.vote_average}</p>
                  <p className="p-2 text-xm opacity-50">{item.release_date.split("-")[0]}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          null
        )}
      </div>
    </>
  );
}
