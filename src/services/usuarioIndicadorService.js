import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

const useIndicadorUsuarios = (perPage, page, search) => {
  const { data, error, mutate } = useSWR(`/relation?perPage=${perPage}&page=${page}&searchQuery=${search}`, fetcher);
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

const useRelationUsers = (id, page = 1, perPage = 5) => {
  const { data, error, mutate } = useSWR(`/relation/indicador/${id}?page=${page}&perPage=${perPage}`, fetcher);

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

const updateRelation = async (id, data) => {
  return protectedApi.patch(`/relation/${id}`, data);
};

export {
  useIndicadorUsuarios,
  createRelation,
  getUsersThatDoesntHaveRelation,
  useRelationUsers,
  deleteRelation,
  updateRelation,
};