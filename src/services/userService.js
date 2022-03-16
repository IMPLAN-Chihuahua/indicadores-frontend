import { protectedApi } from ".";
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data)

export const getCurrentUser = async () => {
  try {
    const response = await protectedApi.get('/me');
    const { data: user } = response.data;
    if (user) {
      return { ...user };
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const getLastedUsers = async () => {
  try {
    const response = await protectedApi.get('/usuarios');
    const { data: users } = response.data;
    if (users) {
      return [ ...users ];
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const getLastedModules = async () => {
  try {
    const response = await protectedApi.get('/modulos');
    const { data: lastedModules } = response.data;
    if (lastedModules) {
      return [ ...lastedModules ];
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const useModules = (page) => {
  const {data, error} = useSWR(`me/modulos?per_page=10&page=${page}`,fetcher) 
  return{
    modulesList: data,
    isLoading: !error && !data,
    isError: error,
  } 
};

export const getModules = async (page) => {
  try {
    const response = await protectedApi.get(`/me/modulos?per_page=10&page=${page}`);
    if (response.data) {
      return response.data;
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const getLastedIndicators = async () => {
  try {
    const response = await protectedApi.get('/modulos/1/indicadores');
    const { data: indicadors } = response.data;
    if (indicadors) {
      return [ ...indicadors ];
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const createUser = async(user) => {

}