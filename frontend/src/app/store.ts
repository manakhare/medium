import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from "@reduxjs/toolkit";
// import themeReducer from "./../features/theme/themeSlice"
// import userReducer from "./../features/theme/themeSlice";

// const rootReducer = combineReducers({
//     user: userReducer,
//     theme: themeReducer
// })

// export const store = configureStore({
//     reducer: rootReducer
// });




// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
