import { render, screen } from "@testing-library/react";
import Card from "../Card";
import { Movie } from "@/lib/types/movie";

const genresMock = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
];

const movieMock: Movie = {
  id: 1,
  title: "Inception",
  poster_path: "/inception.jpg",
  backdrop_path: "/inception-backdrop.jpg",
  genre_ids: [28, 12],
  release_date: "2010-07-16",
  vote_average: 8.8,
  overview: "A mind-bending thriller",
};

jest.mock("@/store/useAuthStore", () => ({
  useAuthStore: () => ({ token: "mock-token" }),
}));
jest.mock("@/lib/hook/mutations/useFavoriteMutation", () => ({
  useFavoriteMutation: () => ({
    mutateAsync: jest.fn().mockResolvedValue({ message: "Added to favorites" }),
    isPending: false,
  }),
}));

describe("Card component", () => {
  it("renders movie title, genres and release year", () => {
    render(<Card movie={movieMock} genres={genresMock} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText(/Action, Adventure/)).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
  });
});
