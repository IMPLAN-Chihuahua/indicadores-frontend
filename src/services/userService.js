import { protectedApi } from ".";
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data)

const getCurrentUser = async () => {
  try {
    const response = await protectedApi.get('/me');
    const { data: user } = response.data;
    if (user) {
      return { ...user };
    }
    return {};
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    console.log('message', message)
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
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    console.log('message', message)
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
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    console.log('message', message)
    Promise.reject(error)
  }
};

export const useModules = (perPage,page,search) => {
  const {data, error} = useSWR(`me/modulos?per_page=${perPage}&page=${page}&searchQuery=${search}`,fetcher) 
  return{
    modulesList: data,
    isLoading: !error && !data,
    isError: error,
  } 
};

export const useUsers = (perPage,page,search) => {
  const {data, error} = useSWR(`usuarios?per_page=${perPage}&page=${page}&searchQuery=${search}`,fetcher) 
  return{
    usersList: data,
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
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    console.log('message', message)
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
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    console.log('message', message)
    Promise.reject(error)
  }
};

export { getCurrentUser };