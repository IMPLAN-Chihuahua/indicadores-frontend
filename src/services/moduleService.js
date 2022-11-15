import { protectedApi } from '.';

export const createModule = async (modulo) => {
  try {
    const response = await protectedApi.post('/modulos', modulo);
    return response.data;

  } catch (error) {
    throw error;
  };
}
export const toggleTemaStatus = (id) => {
  return protectedApi.post(`/modulos/${id}/toggle-status`);
}

export const getTemas = async () => {
  try {
    const res = await protectedApi.get('/modulos');
    const { data: temas } = res.data;
    return temas;
  } catch (error) {
    throw error;
  }
}





