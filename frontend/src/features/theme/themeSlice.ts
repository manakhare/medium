import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import type { RootState, AppThunk } from "./../../app/store";

export interface ThemeState {
    theme: 'light' | 'dark';
}

const initialState: ThemeState = {
    theme: 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state) => {
            if (state.theme === 'light') state.theme = 'dark';
            else state.theme = 'light';
        }
    }
})

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const getTheme = (state: RootState) => state.theme.theme;
