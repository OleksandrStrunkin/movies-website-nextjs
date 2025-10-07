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
    <section className="mt-[-20px] mx-auto max-w-[1360px] relative">
      <Swiper
        modules={[Navigation, A11y]} // Підключи модулі
        spaceBetween={2} // Відстань між слайдами (у пікселях)
        slidesPerView={1} // Кількість слайдів, що відображаються одночасно
        navigation={{
          nextEl: ".swiper-button-next-custom", // Клас для кнопки ВПРАВО
          prevEl: ".swiper-button-prev-custom", // Клас для кнопки ВЛІВО
        }}
        breakpoints={{
          // Адаптивність: скільки слайдів показувати на різних екранах
          640: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 6, // Наприклад, 4 фільми на великому екрані
            spaceBetween: 10,
          },
        }}
        className="mySwiper" // Для додаткових стилів, якщо потрібно
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Card movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-swiper-navigation absolute bottom-100 right-0 flex justify-end space-x-2 p-2">
        <div className="swiper-button-prev-custom cursor-pointer bg-white/30 p-2 rounded-sm hover:bg-white/20 duration-300">
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </div>
        <div className="swiper-button-next-custom cursor-pointer bg-white/30 p-2 rounded-sm hover:bg-white/20 duration-300">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    </section>
  );
}
