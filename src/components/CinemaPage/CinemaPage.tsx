"use client";
import React, { useEffect, useState } from "react";
import {
  getMoviesList,
  getMoviesListDay,
  getMoviesCategory,
  getMoviesGenres,
} from "../../api/movies";
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
        setItemsDay(resultDay.results);
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
  }, [setItems, setItemsDay]);

  const handleCategoryClick = async (categoryId: number) => {
    try {
      const resultGenres = await getMoviesGenres(categoryId);
      setItemsGenres(resultGenres.results);
      setSelectedCategoryId(categoryId);
    } catch (error) {
      setError(error);
    }
  };
  const [startF, setStartF] = useState(0);
  const [endF, setEndF] = useState(1);

  const nextFilm = () => {
    setStartF((prev) => prev + 1);
    setEndF((prev) => prev + 1);
  };

  return (
    <>
      <ul className="grid w-full mt-20">
        <button
          className="p-2 bg-rose-300/50 z-40 w-16 absolute top-[50%] right-0 hover:bg-slate-300"
          onClick={nextFilm}
        >
          Next
        </button>
        {itemsDay &&
          itemsDay
            .slice(startF, endF)
            .map((item) => (
              <TopDayItems
                key={item.id}
                id={item.id}
                poster={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                bg={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                title={item.original_title || item.name}
                overview={item.overview}
                rate={item.vote_average}
                rDate={item.release_date}
              />
            ))}
      </ul>
      <h2 className="text-4xl my-8">Search movies by category:</h2>
      <div className="flex w-full flex-col justify-between gap-2 mb-8">
        <div className="w-48 h-full">
          <select
            className="border border-slate-600 rounded-md px-2 py-1 w-full cursor-pointer hover:border-current transform duration-500"
            value={selectedCategoryId}
            onChange={(e) => handleCategoryClick(e.target.value)}
          >
            {itemsCategory &&
              itemsCategory.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  className={selectedCategoryId === item.id ? "font-bold" : ""}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <ul className="grid grid-cols-1 gap-2 justify-items-center content-end md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 xl:grid-cols-6">
          {itemsGenres &&
            itemsGenres
              .slice(0, 12)
              .map((item, index) => (
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
      {loading && <p>Loading......</p>}
    </>
  );
}
