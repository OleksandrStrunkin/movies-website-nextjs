import axios from 'axios';

const instance = axios.create({
  baseURL: `https://kitsu.io/api/edge/anime`,
});

export async function getAnimeList() {
  const { data } = await instance.get(`/`);
  return data;
}