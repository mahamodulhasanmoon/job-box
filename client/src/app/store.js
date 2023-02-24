import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/Api/apiSlice";


import authSlice from "../features/auth/authSlice";

 const store = configureStore({

    reducer : {
       [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,

    },

    middleware: (getDefaultMiddleware)=> getDefaultMiddleware(apiSlice.middleware)
   
})

export default store