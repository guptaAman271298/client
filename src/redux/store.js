import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './slices/userSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "root",
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, userSliceReducer);


const store = configureStore({
    reducer: {
        user: persistedUserReducer
    }
})

export default store;