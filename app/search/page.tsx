import { getMoviesBySearch } from "@/lib/api/tmdb";
import SearchResultsClient from "@/components/SearchResultsClient";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query;
  if (!query)
    return <p className="text-center mt-10">Enter a movie name to search.</p>;

  const movies = await getMoviesBySearch(query);

  return (
    <main className="p-6 container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Results for “{query}”</h2>
      {movies.results.length ? (
        <SearchResultsClient movies={movies.results} />
      ) : (
        <p>No results found.</p>
      )}
    </main>
  );
}
