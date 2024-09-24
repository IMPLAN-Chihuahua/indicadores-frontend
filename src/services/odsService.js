import { publicApi } from '.';
import { protectedApi } from '.';
import useSWR from 'swr';

const getOds = async () => {
  try {
    const response = await protectedApi.get('/ods');
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

const getMetas = async (idOds) => {
  try {
    const response = await protectedApi.get(`/ods/metas/${idOds}`)

    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export {
  getOds,
  getMetas
}