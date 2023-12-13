import { protectedApi } from "."

export const deleteVariable = (id) => {
  return protectedApi.delete(`/variables/${id}`);
}

export const updateVariable = (id, values) => {
  return protectedApi.patch(`/variables/${id}`, values);
}