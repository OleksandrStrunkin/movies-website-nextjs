import { useGenresQuery } from "@/lib/hook/queries/useGenresQuery";

export default function GenresSection() {
    const { data: genres, isLoading, isError } = useGenresQuery();

    if (isLoading) {
        return <div>Завантаження жанрів...</div>;
    }
    if (isError || !genres) {
        return <div>Не вдалося завантажити жанри.</div>;
    }
    return (
        <section className="my-8 px-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Жанри</h2>
            <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                    <span
                        key={genre.id}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
        </section>
    );
}   