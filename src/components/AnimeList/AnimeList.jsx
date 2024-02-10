"use client";
import { useEffect, useState } from "react";
import { getAnimeList, getAnimeTrending } from "../../api/anime";
import ListItems from "../modules/ListItems";
import TopDayAnime from "../modules/TopDayItems";

export default function AnimeList() {
  const [items, setItems] = useState(null);
  const [trendList, setTrendList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setLoading(true);
      try {
        const result = await getAnimeList();
        setItems(result.data);
        const resultTrend = await getAnimeTrending();
        setTrendList(resultTrend.data);
        console.log(resultTrend);
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
      <h2 className="text-4xl mt-8">Top day:</h2>
      <ul className="grid gap-2 grid-cols-1 justify-items-center sm:grid-cols-3">
        {trendList &&
          trendList
            .slice(0, 1)
            .map((item, index) => (
              <TopDayAnime
                key={item.id}
                id={item.id}
                poster={item.attributes.posterImage.small}
                title={item.attributes.canonicalTitle}
                overview={item.attributes.description}
                rate={item.attributes.averageRating}
                rDate={item.release_date}
                ind={index}
              />
            ))}
      </ul>
      <h2 className="text-4xl mt-8">The Most Trending Now:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center lg:flex">
        {items &&
          items.map((item) => (
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
