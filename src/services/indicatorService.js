import { protectedApi } from '.';
import useSWRImmutable from 'swr/immutable';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

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

export const changeStatusIndicator = async (id) => {
  try {
    const response = await protectedApi.patch(`/indicadores/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    Promise.reject(error)
  };
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