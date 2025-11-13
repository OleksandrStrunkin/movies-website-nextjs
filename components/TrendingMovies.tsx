"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useFavoritesQuery } from "@/lib/hook/queries/useFavoritesQuery";
import { useAuthStore } from "@/store/useAuthStore";
import Card from "./Card";

import { Movie } from "@/lib/types/movie";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface TrendingMoviesProps {
  movies: Movie[];
}

export default function TrendingMovies({ movies }: TrendingMoviesProps) {

  const { token } = useAuthStore();
    const { data: favoriteIdsResponse } = useFavoritesQuery({ token });
    const favoriteIds = favoriteIdsResponse?.favorites ?? [];
  
    const favoriteSet = new Set(favoriteIds);

  if (!movies || movies.length === 0) {
    return <div>failed to download movies</div>;
  }

  return (
    <section className="relative container mx-auto px-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Popular Movies
        </h2>
        <div className="custom-swiper-navigation flex gap-2">
          <div
            className="swiper-button-prev-custom cursor-pointer p-2 rounded-lg
                      bg-card/70 border border-border text-foreground
                      hover:bg-accent hover:text-white shadow-sm
                      transition-all duration-300"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </div>
          <div
            className="swiper-button-next-custom cursor-pointer p-2 rounded-lg
                      bg-card/70 border border-border text-foreground
                      hover:bg-accent hover:text-white shadow-sm
                      transition-all duration-300"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={8}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 6 },
          640: { slidesPerView: 4, spaceBetween: 8 },
          768: { slidesPerView: 6, spaceBetween: 12 },
          1024: { slidesPerView: 8, spaceBetween: 16 },
        }}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="max-h-[450px]">
            <Card movie={movie} isFavorite={favoriteSet.has(movie.id)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
