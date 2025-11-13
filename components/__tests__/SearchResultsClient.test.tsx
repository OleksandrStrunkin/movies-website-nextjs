import { render, screen } from "@testing-library/react";
import SearchResultsClient from "../SearchResultsClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useFavoritesQuery } from "@/lib/hook/queries/useFavoritesQuery";

jest.mock("@/store/useAuthStore");
jest.mock("@/lib/hook/queries/useFavoritesQuery");
jest.mock("@/components/Card", () => ({
  __esModule: true,
  default: ({ movie, isFavorite }: any) => (
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
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
      { id: 3, title: "Movie 3" },
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

    const movies = [{ id: 1, title: "Movie 1" }];

    render(<SearchResultsClient movies={movies} />);

    expect(screen.getByText("Movie 1 - notfav")).toBeInTheDocument();
  });
});
