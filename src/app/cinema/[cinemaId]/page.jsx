"use client";
import {
  getMovieItem,
  getCast,
  getMovieVideo,
  getMovieTrailer,
} from "@/api/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import photoProfile from "../../../../public/image/photoProfile.svg";


export default function CinemaDetails({ params }) {
  const { cinemaId } = params;
  const [item, setItem] = useState({});

  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState([]);

  const dateObject = new Date(item.release_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const result = await getMovieItem(cinemaId);
        console.log('getmovie', result)
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

  const fetchTailer = async () => {
    setLoading(true);
    try {
      const result = await getMovieTrailer(cinemaId);
      console.log(result);
      setTrailer(result.videos.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  const embedUrl = `https://www.youtube.com/embed/${trailer?.[11]?.key}`;

  return (
    <div className="flex mt-5">
      <div className="">
        <Image
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          width={400}
          height={300}
          alt="poster"
          className="border border-opacity-50 border-gray-500"
        />
        <div className="mb-5">
          <h2 className="text-2xl">Additional Information:</h2>
          <p>Duration: {item.runtime} mins</p>
          <p>IMDb Rating: {item.vote_average}</p>
          <p>Release Date: {item.release_date}</p>
          <p>Country: {item.production_countries?.[0]?.name || "N/A"}</p>
        </div>
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
        <div className="mb-5">
          <div className="mb-5">
            <h2 className="text-2xl">Trailer:</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={fetchTailer}
            >
              Watch Trailer
            </button>
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              title={item.original_title || item.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="text-2xl mb-2">Cast:</h2>
          <ul className="flex flex-wrap">
            {cast &&
              cast.map((actor) => (
                <li key={actor.id} className="w-1/4 p-2">
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
                  <p className="text-center">{actor.name}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="mb-5">
          <a
            href={item.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Visit Official Website
          </a>
        </div>
      </section>
      {loading && <p>Loading......</p>}
    </div>
  );
}

{
  /* {cast &&
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
              )} */
}

{
  /* {cast.length > MAX_VISIBLE_ACTORS && (
            <button onClick={handleToggleActors} className={styles.btn}>
              {hideActors ? "Show More" : "Show Less"}
            </button>
          )} */
}
