export async function updateUsername(newName: string, token: string) {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username: newName }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update username");
  }

  return res.json();
}
