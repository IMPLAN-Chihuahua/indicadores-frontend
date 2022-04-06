import { publicApi } from '.';
import { protectedApi } from '.';

const getIndicator = async (id) => {
    try {
        const response = await protectedApi.get(`/me/indicadores/${id}`);
        return response.data.data;
    } catch (error) {
        Promise.reject(error);
    }
};

const updateIndicator = async (id, data) => {
    console.log(data);
    try {
        const patch = await protectedApi.patch(`/indicadores/${id}`, data);
        return 1;
    } catch (error) {
        throw (error);
    }
}

export {
    getIndicator,
    updateIndicator,
};