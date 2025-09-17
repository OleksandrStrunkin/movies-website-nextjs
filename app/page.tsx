"use client";
import TrendingMovies from "@/components/TrendingMovies";
import HeroBanner from "@/components/HeroBanner";
import GenresSection from "@/components/GenresSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TrendingMovies />
      <GenresSection />
    </>
  );
}
