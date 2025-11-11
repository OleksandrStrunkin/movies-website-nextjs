export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchTrendingMoviesServer() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  const data = await res.json();
  if (!res.ok) return;
  return data;
}
