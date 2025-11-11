"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

import { useFavoritesQuery } from "@/lib/hook/queries/useFavoritesQuery";
import { useUpdateUsernameMutation } from "@/lib/hook/mutations/useUpdateUsernameMutation";
import { useFavoriteMoviesQuery } from "@/lib/hook/queries/useFavoriteMoviesQuery";


export default function ProfilePage() {
  const { user, setUser, logout, token } = useAuthStore();
  const router = useRouter();

  const {
    data: favoriteIdsResponse,
    isLoading: isLoadingFavorites,
  } = useFavoritesQuery({ token });

  const [editingName, setEditingName] = useState(user?.username || "");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const {
    data: favorites,
    isLoading: isLoadingMovies,
  } = useFavoriteMoviesQuery(favoriteIdsResponse?.favorites);

  const handleLogout = async () => {
    try {
      logout();
      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateUsernameMutation = useUpdateUsernameMutation();

  const handleSave = async () => {
    if (!editingName.trim()) {
      setMessage("Name cannot be empty");
      return;
    }
    if (!token) {
      setMessage("Authorization token missing.");
      return;
    }

    updateUsernameMutation.mutate(
      { newName: editingName, token },
      {
        onSuccess: (data) => {
          setUser({...user!, username: data.username || user!.username});
          setMessage("Name updated successfully!");
          setIsEditing(false);
        },
        onError: (err: any) => {
          console.error(err);
          setMessage(err.message || "Error updating name");
        },
      }
    );
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

  const isDataLoading = isLoadingFavorites || isLoadingMovies;
  const isSaving = updateUsernameMutation.isPending;
  const usernameUpdateError = updateUsernameMutation.isError
    ? updateUsernameMutation.error.message
    : "";

  return (
    <div className="container mx-auto min-h-screen flex flex-col lg:flex-row gap-6 items-start justify-start text-foreground bg-background px-6 md:py-12">
      <div className="border border-border rounded-xl p-6 shadow-lg w-full lg:max-w-[450px] bg-card">
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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div
            className="flex-shrink-0 w-24 h-24 rounded-full bg-accent/20 flex items-center 
          justify-center text-4xl font-bold text-accent shadow-inner"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full">
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
                    disabled={isSaving}
                    className="px-4 py-1 bg-accent text-white rounded-md hover:bg-accent-hover transition"
                  >
                    {isSaving ? "Saving..." : "Save"}
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
                {(message || usernameUpdateError) && (
                  <p
                    className={`text-sm mt-1 ${
                      usernameUpdateError ? "text-error" : "text-success"
                    }`}
                  >
                    {message || usernameUpdateError}
                  </p>
                )}
              </div>
            )}
            <p className="text-sm text-foreground/60">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-2 md:p-6 shadow-lg w-full">
        <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
          Favorite Movies
        </h2>

        {isDataLoading ? (
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
