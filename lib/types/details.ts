export interface Video {
  key: string;
  name: string;
  site: "YouTube" | "Vimeo";
  type: "Trailer" | "Teaser" | "Clip" | "Featurette";
}
interface CastMember {
  id: number;
  name: string;
  character: string;
    profile_path: string | null;
    cast_id: number;
}

 interface VideosResponse {
  results: Video[];
}

interface CreditsResponse {
  cast: CastMember[];
  crew: any[];
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  homepage: string;
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  vote_average: number;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
}

export interface MovieDetailsResponse extends MovieDetails {
  videos: VideosResponse;
  credits: CreditsResponse;
}
