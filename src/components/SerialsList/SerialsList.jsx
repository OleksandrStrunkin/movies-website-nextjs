'use client'
import { useEffect, useState } from "react";
import ListItems from "../modules/ListItems";
import { getSerialsList } from "../../api/serials";
import styles from "./SerialsList.module.css"


export default function SerialsList() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setLoading(true);
      try {
        const result = await getSerialsList();
        setItems(result.results);
        console.log(result.results)
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
              title={item.original_name || item.name}
            />
          ))}
      </ul>
        {loading && <p>Loading......</p>}
    </>
  );
}