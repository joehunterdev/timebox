import authReducer from './auth-slice';
import boxReducer from './box-slice';

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        stack: boxReducer,
        auth: authReducer
    }
}
)  


export default store

 