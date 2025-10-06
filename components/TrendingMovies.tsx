"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useTrendingMoviesQuery } from "@/lib/hook/queries/useTrendingMoviesQuery";

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
    <section className="my-8 mx-auto max-w-[1360px]">
      <Swiper
        modules={[Navigation, A11y]} // Підключи модулі
        spaceBetween={2} // Відстань між слайдами (у пікселях)
        slidesPerView={1} // Кількість слайдів, що відображаються одночасно
        navigation // Включити кнопки навігації
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
            {/* Тут буде компонент картки фільму */}
            <div className="bg-amber-900 rounded-lg text-white mx-auto flex flex-col items-center">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="rounded-md"
              />
              <h3 className="text-sm font-semibold mt-2 overflow-hidden truncate w-40 text-center">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-300">{movie.release_date}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
