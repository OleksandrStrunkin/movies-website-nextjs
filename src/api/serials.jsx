import axios from 'axios';

const KEY = '0a221be11a4630df713925aec9466cbd';

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
});

export async function getSerialsList() {
  const { data } = await instance.get(`/tv/on_the_air?api_key=${KEY}`);
  return data;
}
