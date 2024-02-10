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
        <h2 className="text-4xl mt-8">Search:</h2>
        <div className="mt-4 mb-8">
          <input
            type="text"
            placeholder="Enter movie title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black border border-gray-300 p-2 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading......</p>}
        {error && <p>Error: {error.message}</p>}
        {items && items.length > 0 ? (
          <ul>
          {items.map((item) => (
            <li className="border border-gray-300 p-2 rounded-md" key={item.id}>{item.original_title || item.name}</li>
          ))}
        </ul>
        ) : (
          <p>No movies found.</p>
        )}
      </>
    );
  }