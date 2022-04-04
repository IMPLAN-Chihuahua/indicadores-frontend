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

export {
    getIndicator,
};