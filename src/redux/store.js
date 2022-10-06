import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

// Reducers
import userReducer from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        activeUser: userReducer,
    },
    middleware: [
        thunk,
        promiseMiddleware,
        promise,
        logger,
    ]
})