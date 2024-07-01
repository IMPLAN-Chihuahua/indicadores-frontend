import { protectedApi } from '.';

export const getDimensionsGeneralInfo = async ({ page, perPage, attributes, id, sortBy, order }) => {

  const attributesQuery = attributes ? attributes.map(attribute => `attributes[]=${attribute}`).join('&') : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';
  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/dimensiones/info/general?b=0&${query}`);
};