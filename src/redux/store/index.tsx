import { applyMiddleware, createStore } from "redux";
import * as thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reducers";

const loggerMiddleware = createLogger();
let middlewares;
if (__DEV__) {
  middlewares = [thunkMiddleware.default, loggerMiddleware];
} else {
  middlewares = [thunkMiddleware.default];
}
const store = createStore(
  reducers,
  __DEV__ ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)
);

export default store;
