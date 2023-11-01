'use client'
import { useEffect, useState } from "react";
import { getMoviesList, getMoviesListDay } from "../../api/movies";
import ListItems from "../modules/ListItems";
import TopDayItems from "../modules/TopDayItems";

export default function CinemaList() {
  const [items, setItems] = useState(null);
  const [itemsDay, setItemsDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setLoading(true);
      try {
        const result = await getMoviesList();
        setItems(result.results);
        const resultDay = await getMoviesListDay();
        setItemsDay(resultDay.results)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesList();
  }, [setError, setItems, setItemsDay, setLoading]);

  return (
    <>
      <h2 className="text-4xl mt-8">Top day:</h2>
        <ul className="grid gap-2 grid-cols-1 justify-items-center sm:grid-cols-3">
          {itemsDay && itemsDay.slice(1,4).map((item) => (
            <TopDayItems
              key={item.id}
              id={item.id}
              poster={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              title={item.original_title || item.name}
              overview={item.overview}
              rate={item.vote_average}
              rDate={item.release_date}
            />
          ))}
      </ul>
      <h2 className="text-4xl mt-8">The Most Trending Now:</h2>
         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center mb-64 lg:flex">
          {items && items.slice(2,8).map((item, index) => (
            <ListItems
              key={item.id}
              id={item.id}
              poster={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              title={item.original_title || item.name}
              overview={item.overview}
              rate={item.vote_average}
              rDate={item.release_date}
              index={index}
            />
          ))}
      </ul>
      <h2 className="text-4xl mt-8">Search movies by category</h2>
        {loading && <p>Loading......</p>}
    </>
  );
}