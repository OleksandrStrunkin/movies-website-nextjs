"use client";
import { getAnimeItem, getAnimeCharacter } from "@/api/anime";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./animeId.module.css";
import photoProfile from "../../../../public/image/photoProfile.svg";

const MAX_VISIBLE_ACTORS = 5;

export default function AnimeDetails({ params }) {
  const { animeId } = params;
  const [item, setItem] = useState(null);

  const [cast, setCast] = useState([]);
  const [visibleActors, setVisibleActors] = useState(MAX_VISIBLE_ACTORS);
  const [hideActors, setHideActors] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const result = await getAnimeItem(animeId);
        setItem(result.data.attributes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [animeId, setError, setItem, setLoading]);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const result = await getAnimeCharacter(animeId);
        setCast(result.data.attributes);
        console.log(result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [setError, setCast, setLoading, animeId]);

//   const handleToggleActors = () => {
//     setHideActors(!hideActors);
//     if (hideActors) {
//       setVisibleActors(cast.length);
//     } else {
//       setVisibleActors(MAX_VISIBLE_ACTORS);
//     }
//   };
    if(!item){
      return
    }

  return (
    <div className={styles.movieDetails}>
      <div className={styles.poster}>
         <Image
          src={item.posterImage.large}
          width={500}
          height={750}
          alt="poster"
        />
      </div>
      <section className={styles.main}>
        <div className={styles.info}>
          <h1>{item.canonicalTitle}</h1>
          <p>{item.release_date}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.descr}>Description:</h2>
          <p>{item.description}</p>
        </div>
        {/* <div className={styles.section}>
          <h2 className={styles.titleCast}>Cast:</h2>
          <ul className={styles.cast}>
            {cast &&
              (hideActors ? cast.slice(0, visibleActors) : cast).map(
                (actor) => (
                  <li key={actor.id}>
                    <Image
                      src={
                        actor.profile_path
                          ? cast.image.original
                          : photoProfile
                      }
                      width={138}
                      height={175}
                      alt={`${actor.name}`}
                    />
                    {cast.canonicalName}
                  </li>
                )
              )}
          </ul>
          {cast.length > MAX_VISIBLE_ACTORS && (
            <button onClick={handleToggleActors} className={styles.btn}>
              {hideActors ? "Show More" : "Show Less"}
            </button>
          )}
        </div>
        <div className={styles.section}>
          <a href={item.homepage} target="_blank" rel="noopener noreferrer">
            Visit Official Website
          </a>
        </div> */}
      </section>
      {loading && <p>Loading......</p>}
    </div>
  );
}
