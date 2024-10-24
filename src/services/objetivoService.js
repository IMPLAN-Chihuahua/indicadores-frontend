import { protectedApi } from '.';
import qs from 'qs';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from './indicatorService';
import { useEffect, useState } from 'react';

export const getObjetivosGeneralInfo = async (params) => {
  const { page, perPage, attributes, id, sortBy, order } = params | {}
  const attributesQuery = attributes ? attributes.map(attribute => `attributes[]=${attribute}`).join('&') : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/objetivos/info/general?b=0&${query}`);
};

export const getObjetivos = async (params) => {
  const { page, perPage, attributes, id, sortBy, order } = params | {}

  const attributesQuery = attributes ? attributes.map(attribute => `attributes[]=${attribute}`).join('&') : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/objetivos?b=0&${query}`);
}

export const useObjetivos = (args) => {
  const { page = 1, perPage = 25, searchQuery = '', ...moreParams } = args || {};
  const queryParams = qs.stringify({ page, perPage, searchQuery, ...moreParams }, {
    skipNulls: true,
    addQueryPrefix: true,
  });

  const { data: res, error, mutate } = useSWRImmutable(`/objetivos${queryParams.toString()}`, fetcher);
  const [objetivos, setObjetivos] = useState([])
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!res) return;

    setObjetivos(res.data)
    setTotal(res.total);
    setTotalPages(res.totalPages)
  }, [res])

  return {
    objetivos,
    total,
    totalPages,
    isLoading: !res && !error,
    hasError: error,
    mutate
  }
}