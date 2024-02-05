import axios from 'axios';

const KEY = '0a221be11a4630df713925aec9466cbd';

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

export async function getMovieTrailer(id) {
  const { data } = await instance.get(
    `/movie/${id}?api_key=${KEY}&append_to_response=videos`
  );
  return data;
}

export async function getMoviesList() {
  const { data } = await instance.get(`/trending/all/week?api_key=${KEY}`);
  return data;
}

export async function getMoviesListDay() {
  const { data } = await instance.get(`/trending/all/day?api_key=${KEY}`);
  return data;
}

export async function getMoviesCategory() {
  const { data } = await instance.get(`/genre/movie/list?api_key=${KEY}`);
  return data;
}

export async function getMoviesGenres(id) {
  const { data } = await instance.get(`/discover/movie?api_key=${KEY}&with_genres=${id}`);
  return data;
}

export async function getMovieItem(id) {
  const { data } = await instance.get(
    `/movie/${id}?api_key=${KEY}&language=en-US`
  );
  return data;
}

export async function getCast(id) {
  const { data } = await instance.get(
    `/movie/${id}/credits?api_key=${KEY}&language=en-US`
  );
  return data;
}

export async function getReviews(id) {
  const { data } = await instance.get(
    `/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
  return data;
}

export async function getSearchMovies(value) {
  const { data } = await instance.get(
    `/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${value}`
  );
  return data;
}

export async function getMovieVideo(id) {
  const { data } = await instance.get(
    `/movie/${id}/images?api_key=${KEY}`
  );
  return data;
}

