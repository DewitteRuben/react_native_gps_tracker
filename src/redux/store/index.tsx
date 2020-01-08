import { applyMiddleware, createStore } from "redux";
import * as thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reducers";

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware.default, loggerMiddleware];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
