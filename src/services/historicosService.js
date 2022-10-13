import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

export const useHistoricos = (perPage, page, idIndicador, sortBy, order) => {
  const { data, error, mutate } =
    useSWR(
      `/historicos/${idIndicador}?perPage=${perPage}&page=${page}&order=${order}&sortBy=${sortBy}`,
      fetcher,
    );

  return {
    historicosList: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const deleteHistorico = (idHistorico) => {
  try {
    const response = protectedApi.delete(`/historicos/${idHistorico}`);
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const editHistoricos = (idHistorico, data) => {
  try {
    const response = protectedApi.patch(`/historicos/${idHistorico}`, data);
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

export const createHistoricos = (idIndicador, data) => {
  try {
    const response = protectedApi.post(`/historicos/${idIndicador}`, data);
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
