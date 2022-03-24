import { createSlice } from '@reduxjs/toolkit'

export const indicadorSlice = createSlice({
    name: 'indicadorFormData',
    initialState: { indicadorForm: {} },
    reducers: {
        addFormData: (state, action) => {
            state.indicadorForm['data'] = action.payload;
        }
    }
});

export const { addFormData } = indicadorSlice.actions;

export default indicadorSlice.reducer;