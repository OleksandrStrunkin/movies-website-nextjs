import { render, screen } from "@testing-library/react";
import SearchResultsClient from "../SearchResultsClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useFavoritesQuery } from "@/lib/hook/queries/useFavoritesQuery";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
}

jest.mock("@/store/useAuthStore");
jest.mock("@/lib/hook/queries/useFavoritesQuery");
jest.mock("@/components/Card", () => ({
  __esModule: true,
  default: ({ movie, isFavorite }: { movie: Movie; isFavorite: boolean }) => (
    <div data-testid="card">
      {movie.title} - {isFavorite ? "fav" : "notfav"}
    </div>
  ),
}));

describe("SearchResultsClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all movies", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ token: "abc" });
    (useFavoritesQuery as unknown as jest.Mock).mockReturnValue({
      data: { favorites: [2] },
    });

    const movies = [
      {
        id: 1,
        title: "Movie 1",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        release_date: "2020-01-01",
        vote_average: 0,
        genre_ids: [],
        genres: [],
      },
      {
        id: 2,
        title: "Movie 2",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        release_date: "2020-01-01",
        vote_average: 0,
        genre_ids: [],
        genres: [],
      },
      {
        id: 3,
        title: "Movie 3",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        release_date: "2020-01-01",
        vote_average: 0,
        genre_ids: [],
        genres: [],
      },
    ];

    render(<SearchResultsClient movies={movies} />);

    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(3);
    expect(screen.getByText("Movie 1 - notfav")).toBeInTheDocument();
    expect(screen.getByText("Movie 2 - fav")).toBeInTheDocument();
    expect(screen.getByText("Movie 3 - notfav")).toBeInTheDocument();
  });

  it("handles empty favorites", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ token: null });
    (useFavoritesQuery as unknown as jest.Mock).mockReturnValue({ data: null });

    const movies = [
      {
        id: 3,
        title: "Movie 3",
        overview: "",
        poster_path: null,
        backdrop_path: null,
        release_date: "2020-01-01",
        vote_average: 0,
        genre_ids: [],
        genres: [],
      },
    ];

    render(<SearchResultsClient movies={movies} />);

    expect(screen.getByText("Movie 1 - notfav")).toBeInTheDocument();
  });
});
