import { protectedApi } from '.';

export const getObjetivosGeneralInfo = async (params) => {
  const { page, perPage, attributes, id, sortBy, order } = params | {}
  const attributesQuery = attributes ? attributes.map(attribute => `attributes[]=${attribute}`).join('&') : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/objetivos/info/general?b=0&${query}`);
};