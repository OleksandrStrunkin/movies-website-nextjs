"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { getMoviesByIds } from "@/lib/api/tmdb";
import { updateUsername } from "@/lib/api/user";

interface FavoriteMovie {
  id: number;
  poster_path?: string | null;
  title: string;
}

export default function ProfilePage() {
  const { user, setUser, logout, token } = useAuthStore();
  const router = useRouter();

  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  // Для редагування імені
  const [editingName, setEditingName] = useState(user?.username || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Загрузка улюблених фільмів
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

  // PUT-запит для оновлення імені
  const handleSave = async () => {
    if (!editingName.trim()) {
      setMessage("Name cannot be empty");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const data = await updateUsername(editingName, token!);
      setUser(data.user);
      setMessage("Name updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Error updating name");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-foreground bg-background">
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg w-full max-w-md text-center">
          <p className="text-foreground/70 mb-4">You are not logged in.</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col lg:flex-row gap-6 items-start justify-start text-foreground bg-background px-6 md:py-12">
      {/* Блок профілю */}
      <div className="border border-border rounded-xl p-6 shadow-lg w-full lg:max-w-[450px] bg-card">
        {/* Заголовок + Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition-all"
          >
            Log Out
          </button>
        </div>

        {/* Основний контент: Аватар + дані */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Аватар */}
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-accent/20 flex items-center 
          justify-center text-4xl font-bold text-accent shadow-inner">
            {user.username.charAt(0).toUpperCase()}
          </div>

          {/* Дані користувача */}
          <div className="flex-1 flex flex-col gap-2 w-full">
            {/* Ім'я або редагування */}
            {!isEditing ? (
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-lg font-medium">{user.username}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-accent hover:underline"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border border-border rounded-md px-2 py-1 flex-grow min-w-[120px] max-w-[200px]"
                  />
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-1 bg-accent text-white rounded-md hover:bg-accent-hover transition"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingName(user.username);
                      setMessage("");
                    }}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
                {message && (
                  <p className="text-sm text-success mt-1">{message}</p>
                )}
              </div>
            )}

            {/* Email */}
            <p className="text-sm text-foreground/60">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Блок улюблених фільмів */}
      <div className="bg-card border border-border rounded-xl p-2 md:p-6 shadow-lg w-full">
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
      </div>
    </div>
  );
}
