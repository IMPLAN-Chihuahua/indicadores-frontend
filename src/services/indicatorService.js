import { protectedApi, publicApi } from '.';
import useSWRImmutable from 'swr/immutable';
import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import qs from 'qs';

export const fetcher = (url) => protectedApi.get(url).then(res => res.data);

export const getIndicator = async (id) => {
  try {
    const response = await protectedApi.get(`/me/indicadores/${id}`);
    return response.data.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const createIndicador = async (payload) => {
  try {
    const { data } = await protectedApi.post('/indicadores', payload)
    return data.data;
  } catch (err) {
    throw err;
  }
}

export const useIndicadorWithSWR = (id) => {
  const { data, error } = useSWR(`/me/indicadores/${id}`, fetcher);
  return {
    indicator: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const updateIndicator = async (id, data) => {
  return protectedApi.patch(`/indicadores/${id}`, data);
  try {
    const patch = await protectedApi.patch(`/indicadores/${id}`, data);
    return patch;
  } catch (error) {
    throw (error);
  }
}

export const setUsersToIndicator = async (id, data) => {
  return protectedApi.post(`/indicadores/${id}/usuarios`, data);
};

export const toggleIndicadorStatus = async (id) => {
  return protectedApi.patch(`/indicadores/${id}/toggle-status`);
}

export const useIndicadorFormula = (id) => {
  const fetcher = (url) => protectedApi.get(url).then(res => res.data.data);
  const { data, error, mutate } = useSWRImmutable(`/indicadores/${id}/formula`, fetcher);
  return {
    data,
    error,
    isLoading: !data && !error,
    mutate,
  };
}

export const updateFormula = (id, values) => {
  return protectedApi.patch(`/formulas/${id}`, values)
}

export const addFormula = (id, formula) => {
  return protectedApi.post(`/indicadores/${id}/formula`, formula)
}

export const getIndicatorsGeneralInfo = async ({ page, perPage, attributes, id, sortBy, order }) => {
  const attributesQuery = attributes
    ? attributes.map(attribute => `attributes[]=${attribute}`).join('&')
    : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/indicadores/info/general?b=0&${query}`);
}

export const getMapa = (id) => {
  return publicApi.get(`/indicadores/${id}/mapa`);
}

export const createMapa = (id, mapa) => {
  return protectedApi.post(`/indicadores/${id}/mapa`, mapa);
}


export const useIndicadores = ({ perPage, page, searchQuery, ...filters }) => {
  const queryParams = useMemo(() => qs.stringify({
    perPage,
    page,
    searchQuery,
    ...filters
  }, {
    skipNulls: true,
    addQueryPrefix: true,
  }), [searchQuery, page, perPage, filters])
  const { data: res, error, mutate } = useSWRImmutable(`/indicadores${queryParams.toString()}`, fetcher)

  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [indicadores, setIndicadores] = useState([])

  useEffect(() => {
    if (!res) return;
    setIndicadores(res.data);
    setTotal(res.total);
    setTotalPages(res.totalPages);
  }, [res])

  return {
    indicadores,
    isLoading: !error && !res,
    hasError: error,
    total,
    totalPages,
    mutate
  }
};


export const getObjetivosStatus = async (idIndicador) => {
  const res = await protectedApi.get(`/indicadores/${idIndicador}/objetivos/status`)
  return res.data;
}


export const destacarIndicadorInObjetivos = async (idIndicador, objetivosStatus) => {
  return protectedApi.post(`/indicadores/${idIndicador}/objetivos/status`, objetivosStatus)
}