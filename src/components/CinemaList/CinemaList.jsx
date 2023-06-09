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
         <ul className={styles.list}>
          {items && items.map((item) => (
            <ListItems
              key={item.id}
              id={item.id}
              poster={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              title={item.original_title || item.name}
              overview={item.overview}
              rate={item.vote_average}
            />
          ))}
      </ul>
        {loading && <p>Loading......</p>}
    </>
  );
}