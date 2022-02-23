import { protectedApi } from ".";

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

export const getUsers = async () => {
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

export const getModules = async () => {
  try {
    const response = await protectedApi.get('/modulos');
    const { data: modules } = response.data;
    if (modules) {
      return [ ...modules ];
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

export const getIndicators = async () => {
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