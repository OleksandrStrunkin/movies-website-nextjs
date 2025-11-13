import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";

describe("Filters component", () => {
  const genres = [
    { id: 0, name: "All genre" },
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
  ];
  const years = [2025, 2024, 2023, 2022];

  let handleGenreChange: jest.Mock;
  let handleYearChange: jest.Mock;

  beforeEach(() => {
    handleGenreChange = jest.fn();
    handleYearChange = jest.fn();

    render(
      <Filters
        genres={genres}
        selectedGenreId={0}
        handleGenreChange={handleGenreChange}
        selectedYear=""
        handleYearChange={handleYearChange}
        years={years}
      />
    );
  });

  it("renders two select elements", () => {
    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(2);
  });

  it("renders genre options correctly", () => {
    genres.forEach((genre) => {
      expect(
        screen.getByRole("option", { name: genre.name })
      ).toBeInTheDocument();
    });
  });

  it("renders year options correctly", () => {
    years.forEach((year) => {
      expect(
        screen.getByRole("option", { name: year.toString() })
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("option", { name: "All years" })
    ).toBeInTheDocument();
  });

  it("calls handleGenreChange when selecting a genre", () => {
    const genreSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(genreSelect, { target: { value: "1" } });
    expect(handleGenreChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleYearChange when selecting a year", () => {
    const yearSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(yearSelect, { target: { value: "2024" } });
    expect(handleYearChange).toHaveBeenCalledTimes(1);
  });
});
