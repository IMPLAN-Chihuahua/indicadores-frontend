import { createSlice } from '@reduxjs/toolkit'

export const indicadorSlice = createSlice({
  name: 'indicadorFormData',
  initialState: {
    basic: {},
    formula: {
      ecuacion: "",
      variables: [{
        nombre: '',
        dato: '',
        anio: '',
        medida: null,
        descripcion: ''
      }]
    },
    mapa: {},
    extra: {}
  },
  reducers: {
    addBasicData: (state, action) => {
      state.basic = action.payload;
    },
    addFormulaData: (state, action) => {
      const { ecuacion, variables } = action.payload;
      state.formula.ecuacion = ecuacion;
      state.formula.variables = [];
      variables.map(v => state.formula.variables.push({ ...v }));
    },
    deleteFormulaVariable: (state, action) => {
      const { index } = action.payload;
      state.formula.variables?.splice(index, 1);
    }
  }
});

export const { addBasicData, addFormulaData, deleteFormulaVariable } = indicadorSlice.actions;

export default indicadorSlice.reducer;