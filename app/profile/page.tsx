"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { getMoviesByIds } from "@/lib/api/tmdb";

interface FavoriteMovie {
  id: number;
  poster_path?: string | null;
  title: string;
}

export default function ProfilePage() {
  const { user, logout, token } = useAuthStore();
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    if (!token) return;
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) return;
       
        const movies = await getMoviesByIds(data.favorites);
        setFavorites(movies);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-foreground bg-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-8 shadow-lg w-full max-w-md text-center"
        >
          <p className="text-foreground/70 mb-4">You are not logged in.</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col md:flex-row gap-16 items-start justify-start text-foreground bg-background px-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className=" border border-border rounded-xl p-8 shadow-lg w-full md:w-1/3 text-center"
      >
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>

        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-4xl font-bold text-accent shadow-inner">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-lg font-medium mt-2">{user.username}</p>
            <p className="text-sm text-foreground/60">{user.email}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-all"
        >
          Log Out
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6 shadow-lg w-full md:flex-1"
      >
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Favorite Movies
        </h2>

        {loading ? (
          <p className="text-center text-foreground/60">Loading...</p>
        ) : favorites.length === 0 ? (
          <p className="text-center text-foreground/60">
            You haven’t added any favorite movies yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                <div className="relative aspect-[2/3]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-center text-sm font-medium truncate">
                  {movie.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
