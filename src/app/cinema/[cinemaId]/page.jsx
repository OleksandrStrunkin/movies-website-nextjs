'use client'
import { getMovieItem, getCast, getMovieVideo } from "@/api/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./cinemaId.module.css"

const MAX_VISIBLE_ACTORS = 5;

export default function CinemaDetails ({params}) {
    const {cinemaId} = params;
    const [item, setItem] = useState({});
    const [video, setVideo] = useState([])

    const [cast, setCast] = useState([])
    const [visibleActors, setVisibleActors] = useState(MAX_VISIBLE_ACTORS);
    const [hideActors, setHideActors] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMovie = async () => {
        setLoading(true);
        try {
          const result = await getMovieItem(cinemaId);
          setItem(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }, [cinemaId, setError, setItem, setLoading]);
    
    useEffect(() => {
      const fetchCast = async () => {
        setLoading(true);
        try {
          const result = await getCast(cinemaId);
          setCast(result.cast);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchCast();
    }, [cinemaId, setError, setCast, setLoading]);

    useEffect(() => {
      const fetchVideo = async () => {
        setLoading(true);
        try {
          const result = await getMovieVideo(cinemaId);
          setVideo(result.results);
          console.log(result.results)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchVideo();
    }, [cinemaId, setError, setVideo, setLoading]);

    const handleToggleActors = () => {
      setHideActors(!hideActors);
      if (hideActors) {
        setVisibleActors(cast.length);
      } else {
        setVisibleActors(MAX_VISIBLE_ACTORS);
      }
    };


    return (
      
      <div className={styles.movieDetails}>
      <div className={styles.poster}>
        <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} width={500} height={750} alt="poster" />
      </div>
     <section className={styles.main}>
        <div className={styles.info}>
          <h1>{item.original_title || item.name}</h1>
          <p>{item.release_date}</p>
        </div>
        <div className={styles.section}>
          <h2>Description</h2>
          <p>{item.overview}</p>
        </div>
        <div className={styles.section}>
        <h2 className={styles.titleCast}>Cast:</h2>
          <ul className={styles.cast}>
          {cast && (hideActors
            ? cast.slice(0, visibleActors)
            : cast).map((actor) => (
          <li key={actor.id}>
            <Image src={`https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`} width={138} height={175} alt={`${actor.name}`} />
            {actor.name}
            </li>
        ))}
          </ul>
          {cast.length > MAX_VISIBLE_ACTORS && (
            <button onClick={handleToggleActors} className={styles.btn}>
              {hideActors ? 'Show More' : 'Show Less'}
            </button>
          )}
        </div>
        <div className={styles.section}>
          <h2>Reviews</h2>
          <ul className={styles.movieList}>
          <li>bob</li>
          <li>bob</li>
          <li>bob</li>
          <li>bob</li>
          <li>bob</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Trailer</h2>
          {/* <iframe src={`https://www.youtube.com/embed/${video[0].key}`} width="560" height="315" title="Trailer" frameborder="0" allowfullscreen></iframe> */}
        </div>
        <div className={styles.section}>
          <a href={item.homepage} target="_blank" rel="noopener noreferrer">Visit Official Website</a>
        </div>
     </section>
      {loading && <p>Loading......</p>}
    </div>
  );
};