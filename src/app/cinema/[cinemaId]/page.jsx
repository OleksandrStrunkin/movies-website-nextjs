"use client";
import { getMovieItem, getCast, getMovieVideo } from "@/api/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./cinemaId.module.css";
import photoProfile from "../../../../public/image/photoProfile.svg";

const MAX_VISIBLE_ACTORS = 5;

export default function CinemaDetails({ params }) {
  const { cinemaId } = params;
  const [item, setItem] = useState({});

  const [cast, setCast] = useState([]);
  const [visibleActors, setVisibleActors] = useState(MAX_VISIBLE_ACTORS);
  const [hideActors, setHideActors] = useState(true);

  const dateObject = new Date(item.release_date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-GB', options);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const result = await getMovieItem(cinemaId);
        console.log(result)
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

  const handleToggleActors = () => {
    setHideActors(!hideActors);
    if (hideActors) {
      setVisibleActors(cast.length);
    } else {
      setVisibleActors(MAX_VISIBLE_ACTORS);
    }
  };

  return (
    <div className="flex mt-5">    
        <div className="w-1/2 h-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            width={900}
            height={600}
            alt="poster"
            className=""

          />
        </div>
      <section className="ml-5 w-9/12">
        <div className="mb-5">
          <h1 className="text-3xl">{item.original_title || item.name}</h1>
          <p className="flex">{formattedDate}</p>
        </div>
        <div>
          <h2 className="text-2xl">Description:</h2>
          <p className="mb-5">{item.overview}</p>
        </div>
        <div className={styles.section}>
          <h2 className="text-2xl mb-2">Cast:</h2>
          <ul className={styles.cast}>
          {cast &&
               cast.slice(0, 6).map(
                (actor) => (
                  <li key={actor.id}>
                    <Image
                      src={
                        actor.profile_path
                          ? `https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`
                          : photoProfile
                      }
                      width={138}
                      height={175}
                      alt={`${actor.name}`}
                    />
                    <p className={styles.actor}>{actor.name}</p>
                  </li>
                )
              )}
            {/* {cast &&
              (hideActors ? cast.slice(0, visibleActors) : cast).map(
                (actor) => (
                  <li key={actor.id}>
                    <Image
                      src={
                        actor.profile_path
                          ? `https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`
                          : photoProfile
                      }
                      width={138}
                      height={175}
                      alt={`${actor.name}`}
                    />
                    <p className={styles.actor}>{actor.name}</p>
                  </li>
                )
              )} */}
          </ul>
          {/* {cast.length > MAX_VISIBLE_ACTORS && (
            <button onClick={handleToggleActors} className={styles.btn}>
              {hideActors ? "Show More" : "Show Less"}
            </button>
          )} */}
          <ul className="flex flex-wrap">
            {cast &&
                 cast.slice(6).map(
                  (actor) => (
                    <li key={actor.id} className="w-1/5 p-2">
                      <p>{actor.name}</p>
                    </li>
                  )
                )}
          </ul>
        </div>
        <div className={styles.section}>
          <a href={item.homepage} target="_blank" rel="noopener noreferrer" className={styles.homepage}>
            Visit Official Website
          </a>
        </div>
      </section>
      {loading && <p>Loading......</p>}
    </div>
  );
}
