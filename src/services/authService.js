import { publicApi } from '.';
import { getCurrentUser } from './userService';

const login = async (email, password) => {
  const response = await publicApi.post('/login', { correo: email, clave: password });
  const token = response.data.token;
  if (token) {
    setJwtToken(token);
  }
  return getCurrentUser();
};

const logout = () => {
  localStorage.removeItem('jwt');
};

const getJwtToken = () => {
  return JSON.parse(localStorage.getItem('jwt'));
};

const setJwtToken = (jwt) => {
  localStorage.setItem('jwt', JSON.stringify(jwt));
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