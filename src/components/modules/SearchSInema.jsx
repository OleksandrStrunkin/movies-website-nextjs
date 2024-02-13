"use client";
import { useEffect, useState } from "react";
import { getSearchMovies } from "../../api/movies";
import Image from "next/image";
import Link from "next/link";

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const closeMenu = (e)=>{
    e.preventDefault();
    setItems(null)
  }

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <>
      <div className="ml-4 relative">
        <form className="" onSubmit={closeMenu}>
          <input
            type="text"
            placeholder="Enter movie title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white bg-transparent border border-slate-500 p-1 rounded-md"
          />
          <Link href={`/search?query=${searchTerm}`} className="ml-2 bg-slate-500 text-white px-4 py-1 rounded-md">SearchPage</Link>
        </form>
        {loading && <p>Loading......</p>}
        {error && <p>Error: {error.message}</p>}
        {items && items.length > 0 ? (
          <ul className="absolute w-full h-full grid grid-cols-1 bg-slate-500 z-10">
            {items.slice(0, 6).map((item) => (
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
                  <p className="px-2 py-1 text-xm">{item.original_title || item.name}</p>
                  <p className="px-2 py-1 text-xs opacity-50">IMDb Rating:<span className="pl-2">{item.vote_average}</span></p>
                  <p className="px-2 py-1 text-xs opacity-50">{item.release_date.split("-")[0]}</p>
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
