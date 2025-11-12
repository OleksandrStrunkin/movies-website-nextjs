import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ToggleFavoriteArgs {
  movieId: number;
  token: string;
}

export const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ movieId, token }: ToggleFavoriteArgs) => {
      const res = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to toggle favorite");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
