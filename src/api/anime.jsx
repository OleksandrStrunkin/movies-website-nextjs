import axios from 'axios';

const instance = axios.create({
  baseURL: `https://kitsu.io/api/edge/`,
});

export async function getAnimeList() {
  const { data } = await instance.get(`anime/`);
  return data;
}

export async function getAnimeItem(id) {
  const { data } = await instance.get(`anime/${id}`);
  return data;
}

{'https://kitsu.io/api/edge/anime-characters/id'}

export async function getAnimeCharacter(id) {
  const { data } = await instance.get(`anime/${id}/characters`);
  return data;
}