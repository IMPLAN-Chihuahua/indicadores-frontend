import { useEffect, useMemo, useState } from "react";
import { protectedApi } from ".";
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import qs from 'qs';

const fetcher = (url) => protectedApi.get(url).then(res => res.data)

export const getCurrentUser = async () => {
  try {
    const response = await protectedApi.get('/me');
    const { data: user } = response.data;
    if (user) {
      return { ...user };
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const getlatestUsers = async () => {
  try {
    const response = await protectedApi.get(`/usuarios?sortBy=updatedAt&order=DESC`);

    const { data: users } = response.data;
    if (users) {
      return [...users];
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const getLatestTemas = async () => {
  try {
    const response = await protectedApi.get('/temas');
    const { data: latestTemas } = response.data;
    if (latestTemas) {
      return [...latestTemas];
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};


export const useUsers = (args) => {
  const { perPage = 25, page = 1, searchQuery = '', activo = null } = args || {};
  const queryParams = qs.stringify({
    page,
    perPage,
    searchQuery,
    activo
  }, {
    skipNulls: true,
    addQueryPrefix: true,
  });
  const { data: res, error, mutate } = useSWRImmutable(`/usuarios${queryParams.toString()}`, fetcher)

  const [usuarios, setUsuarios] = useState([])
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!res) return;

    setUsuarios(res.data);
    setTotal(res.total);
    setTotalPages(res.totalPages);
  }, [res])

  return {
    users: usuarios,
    total,
    totalPages,
    isLoading: !error && !res,
    hasError: error,
    mutate
  }
};

export const useSelector = (topic, perPage, page, search) => {
  const { data, error } = useSWR(
    (topic === 'Indicadores')
      ?
      `indicadores?perPage=${perPage}&page=${page}&searchQuery=${search}`
      :
      `usuarios?perPage=${perPage}&page=${page}&searchQuery=${search}`
    , fetcher
  )
  return {
    itemList: data,
    isLoading: !error && !data,
    isError: error,
  }
};

export const useAutocompleteInput = (key) => {
  const { data, error } = useSWR(key, fetcher)
  return {
    itemList: data,
    isLoadingItems: !error && !data,
    isError: error,
  }
};

export const getTemas = async (page) => {
  try {
    const response = await protectedApi.get(`/me/temas?per_page=10&page=${page}`);
    if (response.data) {
      return response.data;
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const getlatestIndicators = async () => {
  try {
    const response = await protectedApi.get('/temas/1/indicadores');
    const { data: indicadors } = response.data;
    if (indicadors) {
      return [...indicadors];
    }
    return {};
  } catch (error) {
    Promise.reject(error)
  }
};

export const createUser = async (user) => {
  try {
    const response = await protectedApi.post('/usuarios', user)
    const { data: createdUser } = response.data;
    return createdUser ? createdUser : {};
  } catch (error) {
    throw error;
  }
}

export const updateUser = (id, values) => {
  return protectedApi.patch(`/usuarios/${id}`, values);
}

export const updateProfile = async (user) => {
  return protectedApi.patch('/me', user);
}

export const toggleUserStatus = async (id) => {
  return protectedApi.post(`/usuarios/${id}/toggle-status`);
}

export const setIndicatorsToUser = (id, data) => {
  return protectedApi.post(`/usuarios/${id}/indicadores`, data);
}

export const getUserStats = async (id) => {
  return protectedApi.get(`/me/stats/${id}`);
}

export const getUsersFromIndicador = async (id) => {
  return protectedApi.get(`/indicadores/${id}/usuarios`);
}

export const getUsersGeneralInfo = async ({ page, perPage, attributes, id, sortBy, order }) => {

  const attributesQuery = attributes
    ? attributes.map(attribute => `attributes[]=${attribute}`).join('&')
    : '';

  const sortByQuery = sortBy ? `&sortBy=${sortBy}` : '';
  const orderQuery = order ? `&order=${order}` : '';
  const pageQuery = page ? `&page=${page}` : '';
  const perPageQuery = perPage ? `&perPage=${perPage}` : '';

  const query = `${attributesQuery}${sortByQuery}${orderQuery}${pageQuery}${perPageQuery}`;

  return protectedApi.get(`/usuarios/info/general?b=0&${query}`);
}
