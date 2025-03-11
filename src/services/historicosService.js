import { useEffect, useMemo, useState } from 'react';
import { protectedApi } from '.';
import useSWRImmutable from 'swr/immutable';
import qs from 'qs'
import useIsMounted from '../hooks/useIsMounted';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

export const useHistoricos = (perPage, page, idIndicador, sortBy, order) => {
  const queryParams = useMemo(() => qs.stringify({
    perPage,
    page,
    sortBy,
    order,
  }, {
    skipNulls: true,
    addQueryPrefix: true,
  }), [order, page, perPage, sortBy]);
  const { data: res, error, mutate } = useSWRImmutable(`/indicadores/${idIndicador}/historicos${queryParams.toString()}`, fetcher);
  const isMounted = useIsMounted();
  const [historicos, setHistoricos] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0)
  const [latestIndicador, setLatestIndicador] = useState(null);

  useEffect(() => {
    if (!res) return;
    if (!isMounted()) return;

    setHistoricos(res.data)
    setTotal(res.total);
    setTotalPages(res.totalPages)
    setLatestIndicador(res.latestIndicador);
  }, [res, isMounted]);

  return {
    historicos,
    latestIndicador,
    isLoading: !error && !res,
    isError: error,
    total,
    totalPages,
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
    const response = protectedApi.post(`/indicadores/${idIndicador}/historicos`, data);
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
