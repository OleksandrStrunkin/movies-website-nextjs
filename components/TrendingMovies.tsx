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
    <section className="my-8">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]} // Підключи модулі
        spaceBetween={20} // Відстань між слайдами (у пікселях)
        slidesPerView={1} // Кількість слайдів, що відображаються одночасно
        navigation // Включити кнопки навігації
        pagination={{ clickable: false }} // Включити пагінацію (крапки)
        scrollbar={{ draggable: true }} // Включити скролбар
        breakpoints={{
          // Адаптивність: скільки слайдів показувати на різних екранах
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4, // Наприклад, 4 фільми на великому екрані
            spaceBetween: 40,
          },
        }}
        className="mySwiper" // Для додаткових стилів, якщо потрібно
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {/* Тут буде компонент картки фільму */}
            <div className="bg-gray-800 rounded-lg p-4 text-white  w-full h-100 relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mt-8">{movie.title}</h3>
            <p className="text-sm text-gray-300">{movie.release_date}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
