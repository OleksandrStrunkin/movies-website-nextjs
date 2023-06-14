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
        console.log(result.data.attributes)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [animeId, setError, setItem, setLoading]);

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
          <p>{item.startDate}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.descr}>Description:</h2>
          <p className={styles.text}>{item.description}</p>
        </div>
      </section>
      {loading && <p>Loading......</p>}
    </div>
  );
}
