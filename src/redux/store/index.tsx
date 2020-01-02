import { applyMiddleware, createStore } from "redux";
import * as thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "../reducers";

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware.default, loggerMiddleware];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
