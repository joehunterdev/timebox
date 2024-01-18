import authReducer from './auth-slice';
import boxReducer from './box-slice';
import uiReducer from "./ui-slice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        stack: boxReducer,
        auth: authReducer,
        ui: uiReducer
    }
}
)


export default store

