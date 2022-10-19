import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

const useIndicadorUsuarios = (id) => {
  const { data, error, mutate } = useSWR(`/relation`, fetcher);

  return {
    indicadores: data,
    isLoading: !error && !data,
    hasError: error,
    mutate,
  }
}

const createRelation = async (id, data, type) => {
  return protectedApi.post(`/relation/create?relationType=${type}&id=${id}`, data);
};

const getRelationUsers = async (id) => {
  return protectedApi.get(`/relation/indicador/${id}`);
}

export {
  useIndicadorUsuarios,
  createRelation,
  getRelationUsers,
};