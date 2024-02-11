"use client";
import { useEffect, useState } from "react";
import { getSearchMovies } from "../../api/movies";

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
        console.log(items)
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
            <ul className="absolute w-full flex flex-col bg-slate-500 z-10">
              <li>Ось пошук</li>
            {items.map((item) => (
              <li className="border border-gray-300 p-2 rounded-md" key={item.id}>{item.original_title || item.name}</li>
            ))}
          </ul>
          ) : (
            <p className="absolute">No movies found.</p>
          )}
        </div>
      </>
    );
  }