import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query"
import userReducer from "./features/userSlice"
import { api } from "./api";


export const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath] : api.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


setupListeners(store.dispatch);

export default store;

//reduce is like a thing, that combine data and action at one single sote