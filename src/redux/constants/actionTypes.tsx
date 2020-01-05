import { StoreState } from "../store/types";
import { ThunkAction } from "redux-thunk";
export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>;

/* Add All Action constants here  */

export const ACTION_TYPES = {
  UPDATE_DISTANCE_UNIT: "UPDATE_DISTANCE_UNIT",
  UPDATE_TRACKING_ID: "UPDATE_TRACKING_ID",
  UPDATE_ROUTES: "UPDATE_ROUTES",
  ADD_ROUTES: "ADD_ROUTES",
  SET_ROUTE_SAVING_STATE: "SET_ROUTE_SAVING_STATE"
};
