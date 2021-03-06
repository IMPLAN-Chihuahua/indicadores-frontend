import { publicApi } from '.';
import { getCurrentUser } from './userService';

const login = async (email, password) => {
  const response = await publicApi.post('/auth/login', { correo: email, clave: password });
  const token = response.data.token;
  if (token) {
    setJwtToken(token);
  }
  return getCurrentUser();
};

const logout = () => {
  localStorage.removeItem('indicadores-jwt');
};

const getJwtToken = () => {
  return JSON.parse(localStorage.getItem('indicadores-jwt'));
};

const setJwtToken = (jwt) => {
  localStorage.setItem('indicadores-jwt', JSON.stringify(jwt));
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