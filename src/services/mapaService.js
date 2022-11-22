import { protectedApi } from "."

export const updateMapa = (id, values) => {
  return protectedApi.put(`/mapas/${id}`, values);
}