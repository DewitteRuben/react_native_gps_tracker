/**
 * This file includes all the reducers under reducers directory,
 * Import all and add to combineReducers to use any among whole app
 *
 * ** */
import { combineReducers } from "redux";

import settingsReducer from "./settings";
import routesReducer from "./routes";

export default combineReducers({
  settings: settingsReducer,
  routes: routesReducer
});
