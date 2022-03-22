import { protectedApi } from "."

export const getRoles = () => {
    return protectedApi.get('/roles');
}