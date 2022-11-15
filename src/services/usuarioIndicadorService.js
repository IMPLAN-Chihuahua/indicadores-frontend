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

const useRelationUsers = (id) => {
  const { data, error, mutate } = useSWR(`/relation/indicador/${id}`, fetcher);

  return {
    indicador: data,
    isLoading: !error && !data,
    hasError: error,
    mutate,
  }
};

const getUsersThatDoesntHaveRelation = async (id) => {
  return protectedApi.get(`/relation/indicador/${id}/usuarios`);
};

const deleteRelation = async (id) => {
  return protectedApi.delete(`/relation/${id}`);
};

const updateRelation = async (id) => {
  return protectedApi.patch(`/relation/${id}`);
};

export {
  useIndicadorUsuarios,
  createRelation,
  getUsersThatDoesntHaveRelation,
  useRelationUsers,
  deleteRelation,
  updateRelation,
};