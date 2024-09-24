import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

export interface UserState {
    username: string;
    firstname: string;
    email: string;
    isLoggedIn: boolean;
}

const initalUserState = {
    username: 'Anonymous',
    firstname: '',
    email: '',
    isLoggedIn: false
}

export const userReducer = (state = initalUserState, action: PayloadAction) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'SET_FIRSTNAME':
            return {
                ...state,
                firstname: action.payload
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                isLoggedIn: state.isLoggedIn === true ? false : true
            };
        case 'GET_USER_DATA':
            return state;
        default:
            return state;
    }
}

export const fetchUserData = () => (dispatch: AppDispatch, getState: RootState) => {
    dispatch({
        type: 'GET_USER_DATA'
    });
}

export const setUsername = (username: String) => (dispatch: AppDispatch, getState: RootState) => {
    dispatch({
        type: 'SET_USERNAME',
        payload: username
    })
}

export const setFirstname = (firstname: String) => (dispatch: AppDispatch, getState: RootState) => {
    dispatch({
        type: 'SET_FIRSTNAME',
        payload: firstname
    })
}

export const setEmail = (email: String) => (dispatch: AppDispatch, getState: RootState) => {
    dispatch({
        type: 'SET_EMAIL',
        payload: email
    })
}

export const setLoginState = () => (dispatch: AppDispatch, getState: RootState) => {
    dispatch({
        type: 'SET_LOGIN_STATE'
    })
}



