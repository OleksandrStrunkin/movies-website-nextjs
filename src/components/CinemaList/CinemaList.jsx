'use client'
import { useEffect, useState } from "react";
import { getMoviesList, getMoviesListDay, getMoviesCategory, getMoviesGenres } from "../../api/movies";
import ListItems from "../modules/ListItems";
import TopDayItems from "../modules/TopDayItems";
import CategoryList from "../modules/CategoryList";
import SearchSinema from "../modules/SearchSInema";

export default function CinemaList() {
  const [items, setItems] = useState(null);
  const [itemsDay, setItemsDay] = useState(null);
  const [itemsCategory, setItemsCategory] = useState(null);
  const [itemsGenres, setItemsGenres] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
        const resultCategory = await getMoviesCategory();
        setItemsCategory(resultCategory.genres);
        const resultGenres = await getMoviesGenres(18);
        setItemsGenres(resultGenres.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesList();
  }, [setError, setItems, setItemsDay, setLoading]);

  const handleCategoryClick = async (categoryId) => {
    try {
      const resultGenres = await getMoviesGenres(categoryId);
      setItemsGenres(resultGenres.results);
      setSelectedCategoryId(categoryId);
    } catch (error) {
      setError(error);
    }
  };

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
         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center lg:flex">
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
      <h2 className="text-4xl my-8">Search movies by category:</h2>
      <div className="flex w-full justify-between gap-2 mb-8">
        <div className="flex gap-1 w-48 h-full flex-col">
          {itemsCategory && itemsCategory.map((item, index) => (
                <button
                key={item.id}
                className={`flex ${selectedCategoryId === item.id ? 'font-bold border-current' : ''} pl-2 w-48 border border-slate-600 rounded-md hover:border-current transform duration-500`}
                onClick={() => handleCategoryClick(item.id)}
              >
                {item.name}
              </button>
              ))}
        </div>
        <ul className="grid grid-cols-1 gap-2 justify-items-center content-end md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 xl:grid-cols-6">
            {itemsGenres && itemsGenres.slice(0, 12).map((item, index) => (
              <CategoryList
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
      </div>
      <SearchSinema/>
        {loading && <p>Loading......</p>}
    </>
  );
}