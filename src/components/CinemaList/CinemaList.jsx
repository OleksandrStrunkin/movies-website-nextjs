'use client'
import { useEffect, useState } from "react";
import { getMoviesList } from "../../api/movies";
import ListItems from "../modules/ListItems";
import styles from "./CinemaList.module.css"

export default function CinemaList() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setLoading(true);
      try {
        const result = await getMoviesList();
        console.log(result)
        setItems(result.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesList();
  }, [setError, setItems, setLoading]);

  return (
    <>
         <ul className="grid gap-2 grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items && items.map((item) => (
            <ListItems
              key={item.id}
              id={item.id}
              poster={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              title={item.original_title || item.name}
              overview={item.overview}
              rate={item.vote_average}
              rDate={item.release_date}
            />
          ))}
      </ul>
        {loading && <p>Loading......</p>}
    </>
  );
}