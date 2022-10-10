import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

const getIndicator = async (id) => {
  try {
    const response = await protectedApi.get(`/me/indicadores/${id}`);
    return response.data.data;
  } catch (error) {
    Promise.reject(error);
  }
};

const createIndicador = async (payload) => {
  try {
    const { data } = await protectedApi.post('/indicadores', payload)
    return data.data;
  } catch (err) {
    throw err;
  }
}

const useIndicadorWithSWR = (id) => {
  const { data, error } = useSWR(`/me/indicadores/${id}`, fetcher);
  return {
    indicator: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const updateIndicator = async (id, data) => {
  try {
    const patch = await protectedApi.patch(`/indicadores/${id}`, data);
    return 1;
  } catch (error) {
    throw (error);
  }
}

const setUsersToIndicator = async (id, data) => {
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

export {
  getIndicator,
  updateIndicator,
  useIndicadorWithSWR,
  setUsersToIndicator,
  createIndicador
};