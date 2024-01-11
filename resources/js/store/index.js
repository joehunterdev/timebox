import boxReducer from './box-slice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        stack: boxReducer
    }
}
)  


export default store

 