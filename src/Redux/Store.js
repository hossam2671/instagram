import { configureStore } from '@reduxjs/toolkit'
import PostSlice from "./Slices/Posts"
export const Store = configureStore({
    reducer: {
        PostSlice 
    }
});