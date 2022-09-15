import { protectedApi } from '.';

export const createModule = async (modulo) => {
  try {
    const response = await protectedApi.post('/modulos', modulo);
    return response.data;

  } catch (error) {
    throw error;
  };
}
export const changeStatusModule = async (id) => {
  try {
    const response = await protectedApi.patch(`/modulos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  };
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





