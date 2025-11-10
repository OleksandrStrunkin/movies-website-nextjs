export async function fetchFavorites(token: string) {
  const res = await fetch("/api/favorite", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) return;
  return data;
}
