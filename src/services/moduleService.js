import { protectedApi } from '.';

export const createModule = async (tema) => {
  try {
    const response = await protectedApi.post('/temas', tema);
    return response.data;
  } catch (error) {
    throw error;
  };
}

export const updateModule = (id, tema) => {
  return protectedApi.put(`/temas/${id}`, tema);
}

export const toggleTemaStatus = (id) => {
  return protectedApi.post(`/temas/${id}/toggle-status`);
}

export const getTemas = async () => {
  try {
    const res = await protectedApi.get('/temas?sortBy=updatedAt&order=DESC');
    const { data: temas } = res.data;
    return temas;
  } catch (error) {
    throw error;
  }
}
export const getModulesGeneralInfo = async ({ page, perPage, attributes, id, sortBy, order }) => {
  const attributesQuery = attributes
    ? attributes.map(attribute => `attributes[]=${attribute}`).join('&')
    : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/temas/info/general?b=0&${query}`);
}