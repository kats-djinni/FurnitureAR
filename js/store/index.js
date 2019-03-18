import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import {composeWithDevTools} from ‘redux-devtools-extension’
import products from "./products";

const reducer = combineReducers({ products });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
export * from "./products";
