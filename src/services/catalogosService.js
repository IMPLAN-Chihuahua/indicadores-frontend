import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

const updateCatalogosDetailIndicadores = async (id, data) => {
  try {
    const patch = await protectedApi.patch(`/catalogos/indicadores/${id}`, data);
    return 1;
  } catch (error) {
    throw (error);
  }
}