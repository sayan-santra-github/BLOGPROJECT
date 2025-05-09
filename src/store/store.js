import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../features/authSlice";
const store = configureStore({
    reducer: {
        auth: authreducer
    },
});

export default store;