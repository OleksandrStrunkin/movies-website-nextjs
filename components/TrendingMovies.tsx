"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTrendingMoviesQuery } from "@/lib/hook/queries/useTrendingMoviesQuery";
import Card from "./Card";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function TrendingMovies() {
  const { data: movies, isLoading, isError } = useTrendingMoviesQuery();

  if (isLoading) {
    return <div>Завантаження трендових фільмів...</div>;
  }

  if (isError || !movies || movies.length === 0) {
    return <div>Не вдалося завантажити трендові фільми.</div>;
  }

  return (
    <section className="relative container mx-auto pb-12 px-4">
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
          640: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 4, spaceBetween: 12 },
          1024: { slidesPerView: 6, spaceBetween: 16 },
        }}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="absolute bottom-0 left-0 right-0 h-20 
                  bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none"
      />
    </section>
  );
}
