import MapboxGL from "@react-native-mapbox-gl/maps";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { TravelingMethod } from "../../utils/supportedTravelingMethods";

export interface StoreState {
  settings: SettingsState;
  routes: RouteState;
}

export interface SettingsState {
  distanceUnit: string;
  trackingId: string;
}

export interface RouteState {
  savedRoutes: RouteData[];
  routeState: IRouteSaveState;
}

export interface RouteDetail {
  title: string;
  distance: string;
  duration: string;
  method: TravelingMethod;
  start: string;
  end: string;
}

export interface IRouteSaveState {
  loading: boolean;
  error: any;
  finished: boolean;
  lastInsertId: string | null;
}

export interface RouteData extends RouteDetail {
  id?: string;
  date?: string;
  coordinates: MapboxGL.Coordinates[];
}

export interface IUpdateRoutesAction extends Action {
  payload: RouteData[];
}

export interface IAddRouteAction extends Action {
  payload: RouteData;
}

export interface IPendingRouteStateAction extends Action {
  payload: IRouteSaveState;
}

export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>;
export const ACTION_TYPES = {
  UPDATE_DISTANCE_UNIT: "UPDATE_DISTANCE_UNIT",
  UPDATE_TRACKING_ID: "UPDATE_TRACKING_ID",
  UPDATE_ROUTES: "UPDATE_ROUTES",
  ADD_ROUTES: "ADD_ROUTES",
  SET_ROUTE_SAVING_STATE: "SET_ROUTE_SAVING_STATE"
};
