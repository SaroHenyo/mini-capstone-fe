import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

// Reducers
import productReducer from './reducers/productReducer';
import blogReducer from './reducers/blogReducer';
import popularProductReducer from "./reducers/popularProductReducer";


export const store = configureStore({
    reducer: {
        productList: productReducer,
        blogList: blogReducer,
        popularProductList: popularProductReducer,
    },
    middleware: [
        thunk,
        promiseMiddleware,
        promise,
        logger,
    ]
})