import { publicApi } from '.';
import { protectedApi } from '.';
import useSWR from 'swr';

const fetcher = (url) => protectedApi.get(url).then(res => res.data);

const getCatalogos = async () => {
    try {
        const response = await protectedApi.get('/catalogos');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const getCatalogosDetails = async (id) => {
    try {
        const response = await protectedApi.get(`/catalogos/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};


const getCatalogosFromIndicador = async (id) => {
    try {
        const response = await protectedApi.get(`/indicadores/${id}/catalogos`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const updateOrCreateCatalogo = async (id, data) => {
    try {
        console.log()
        // console.log(data);
        // const response = await protectedApi.patch(`/indicadores/${id}/catalogos`, data);
        return 1;
    } catch (error) {
        throw error;
    }
}


export {
    getCatalogos,
    getCatalogosDetails,
    getCatalogosFromIndicador,
    updateOrCreateCatalogo
}