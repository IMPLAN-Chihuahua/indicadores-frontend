import { publicApi } from '.';
import { getCurrentUser } from './userService';

const INDICADORES_JWT_KEY = 'indicadores-jwt';

const login = async (email, password) => {
  const response = await publicApi.post('/auth/login', { correo: email, clave: password });
  const token = response.data.token;
  if (token) {
    setJwtToken(token);
  }
  return getCurrentUser();
};

const logout = () => {
  localStorage.removeItem(INDICADORES_JWT_KEY);
};

const getJwtToken = () => {
  return JSON.parse(localStorage.getItem(INDICADORES_JWT_KEY));
};

const setJwtToken = (jwt) => {
  localStorage.setItem(INDICADORES_JWT_KEY, JSON.stringify(jwt));
};

const getAuthHeaders = () => {
  let authorization = '';
  const token = getJwtToken();
  if (token) {
    authorization = `Bearer ${token}`;
  }
  return authorization;
};

export {
  login,
  logout,
  getAuthHeaders
};