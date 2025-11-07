import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";


interface FiltersProps {
  genres: { id: number; name: string }[];
  selectedGenreId: number;
  handleGenreChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedType: string;
  handleTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedYear: string;
  handleYearChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  years: number[];
}

export default function Filters({
  genres,
  selectedGenreId,
  handleGenreChange,
  selectedType,
  handleTypeChange,
  selectedYear,
  handleYearChange,
  years,
}: FiltersProps) {
  const baseSelect =
    "relative appearance-none bg-card text-foreground px-4 py-2.5 rounded-xl border border-border shadow-sm focus:ring-2 focus:ring-accent hover:border-accent transition-all duration-200 ease-in-out cursor-pointer pr-10";

  const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-36 sm:w-44">
      {children}
      <ChevronDownIcon
        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none w-5 h-5"
        strokeWidth={1.7}
      />
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8">
      {/* Genre */}
      <SelectWrapper>
        <select
          value={selectedGenreId}
          onChange={handleGenreChange}
          className={baseSelect}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </SelectWrapper>

      {/* Type */}
      <SelectWrapper>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className={baseSelect}
        >
          <option value="movie">🎬 Movies</option>
          <option value="tv">📺 Series</option>
        </select>
      </SelectWrapper>

      {/* Year */}
      <SelectWrapper>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className={baseSelect}
        >
          <option value="">📅 All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </SelectWrapper>
    </div>
  );
}
