import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "./../../app/store";

export interface UserState {
    username: string;
    firstname: string;
    email: string;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    username: 'Anonymous',
    firstname: '',
    email: '',
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setFirstname: (state, action: PayloadAction<string>) => {
            state.firstname = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setLoginState: (state) => {
            if (state.isLoggedIn === true) state.isLoggedIn = false;
            else state.isLoggedIn = true;
        },
    }
})

export const { setUsername, setFirstname, setEmail, setLoginState } = userSlice.actions;
export default userSlice.reducer;

export const getUsername = (state: RootState) => state.user.username;
export const getFirstname = (state: RootState) => state.user.firstname;
export const getEmail = (state: RootState) => state.user.email;
export const getLoginState = (state: RootState) => state.user.isLoggedIn;