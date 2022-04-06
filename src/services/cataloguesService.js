import { publicApi } from '.';
import { protectedApi } from '.';

const getCatalogos = async () => {
    try {
        const response = await protectedApi.get('/catalogos');
        return response.data.data;
    } catch (error) {
        Promise.reject(error);
    }
};

const getCatalogosDetails = async (id) => {
    try {
        const response = await protectedApi.get(`/catalogos/${id}`);
        return response.data.data;
    } catch (error) {
        Promise.reject(error);
    }
};

const getCatalogosFromIndicador = async (id) => {
    try {
        const response = await protectedApi.get(`/catalogos/indicador/${id}`);
        return response.data.data;
    } catch (error) {
        Promise.reject(error);
    }
}

export {
    getCatalogos,
    getCatalogosDetails,
    getCatalogosFromIndicador
}