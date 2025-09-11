import { protectedApi } from '.';
import qs from 'qs';
import useSWRImmutable from 'swr/immutable';
import { useEffect, useState } from 'react';
import { fetcher } from './indicatorService';

export const createTema = async (tema) => {
  try {
    const response = await protectedApi.post('/temas', tema);
    return response.data;
  } catch (error) {
    throw error;
  };
}

export const updateTema = (id, tema) => {
  return protectedApi.put(`/temas/${id}`, tema);
}

export const toggleTemaStatus = (id) => {
  return protectedApi.post(`/temas/${id}/toggle-status`);
}

export const getTemas = async () => {
  try {
    const res = await protectedApi.get('/temas?sortBy=updatedAt&order=DESC');
    const { data: temas } = res.data;
    return temas;
  } catch (error) {
    throw error;
  }
}

export const getTemasGeneralInfo = async ({ page, perPage, attributes, id, sortBy, order }) => {
  const attributesQuery = attributes
    ? attributes.map(attribute => `attributes[]=${attribute}`).join('&')
    : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/temas/info/general?b=0&${query}`);
}


export const useTemas = (args) => {
  const { page = 1, perPage = 25, searchQuery = '', ...moreParams } = args || {};
  const queryParams = qs.stringify({ page, perPage, searchQuery, ...moreParams }, {
    skipNulls: true,
    addQueryPrefix: true,
  });

  const { data: res, error, mutate } = useSWRImmutable(`/me/temas${queryParams.toString()}`, fetcher);
  const [temas, setTemas] = useState([])
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!res) return;

    setTemas(res.data)
    // setTotal(res.total);
    // setTotalPages(res.totalPages)
  }, [res])

  return {
    temas,
    total,
    totalPages,
    isLoading: !res && !error,
    hasError: error,
    mutate
  }
}