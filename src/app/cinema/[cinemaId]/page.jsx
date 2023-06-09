'use client'
import { getMovieItem } from "@/api/movies";
import { useEffect, useState } from "react";


export default function CinemaDetails ({params}) {
    const {cinemaId} = params;
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const result = await getMovieItem(cinemaId);
          setItem(result);
          console.log(result)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }, [cinemaId, setError, setItem, setLoading]);
    
    console.log(item)

    return (
    <>
    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
    <p>phoster</p>
    <p>{item.original_title || item.name}</p>
    {loading && <p>Loading......</p>}
    </>
    )
};