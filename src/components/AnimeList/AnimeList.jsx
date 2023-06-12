'use client'
import { useEffect, useState } from "react";
import { getAnimeList } from "../../api/anime";
import ListItems from "../modules/ListItems";
import styles from "./AnimeList.module.css"

export default function AnimeList() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setLoading(true);
      try {
        const result = await getAnimeList();
        setItems(result.data);
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
              poster={item.attributes.posterImage.small}
              title={item.attributes.canonicalTitle}
              overview={item.attributes.description}
              rate={item.attributes.averageRating}
            />
          ))}
      </ul>
        {loading && <p>Loading......</p>}
    </>
  );
}