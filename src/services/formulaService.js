import { protectedApi } from "."

export const updateFormula = (idFormula, values) => {
  return protectedApi.patch(`/formulas/${idFormula}`, values)
}

export const addVariable = (idFormula, variable) => {
  return protectedApi.post(`/formulas/${idFormula}/variables`, variable)
}