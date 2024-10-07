import { protectedApi } from '.';

export const getCoberturas = async () => {
  try {
    const res = await protectedApi.get('/coberturas/info/general?sortBy=updatedAt&order=DESC');
    const { data: coberturas } = res.data;
    return coberturas;
  } catch (error) {
    throw error;
  }
}