import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

export const useHistoricos = (perPage, page, idIndicador, sortBy, order) => {
  const { data, error } = useSWR(`/historicos/${idIndicador}?perPage=${perPage}&page=${page}&order=${order}&sortBy=${sortBy}`, fetcher);

  return {
    historicosList: data,
    isLoading: !error && !data,
    isError: error,
  };
}