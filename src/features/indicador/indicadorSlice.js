import { createSlice } from '@reduxjs/toolkit'

export const indicadorSlice = createSlice({
	name: 'indicadorFormData',
	initialState: {
		basic: {},
		formula: {
			ecuacion: "",
			variables: []
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
	}
});

export const { addBasicData, addFormulaData, handleBack, handleNext } = indicadorSlice.actions;

export default indicadorSlice.reducer;