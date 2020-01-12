import { ActionCreator } from "redux";

import { AsyncStorage } from "react-native";
import uuidv4 from "uuid/v4";
import update from "react-addons-update";

import moment from "moment";
import {
  IPendingRouteStateAction,
  ACTION_TYPES,
  IUpdateRoutesAction,
  RouteData,
  IAddRouteAction,
  ThunkResult,
  IRouteSaveState
} from "../../store/types";

const ROUTE_KEY = "STORE_ROUTES";

export const setPendingRouteState: ActionCreator<IPendingRouteStateAction> = (payload: IRouteSaveState) => ({
  payload,
  type: ACTION_TYPES.SET_ROUTE_SAVING_STATE
});

export const updateRoutesAction: ActionCreator<IUpdateRoutesAction> = (payload: RouteData[]) => ({
  payload,
  type: ACTION_TYPES.UPDATE_ROUTES
});

export const addRouteAction: ActionCreator<IAddRouteAction> = (payload: RouteData) => ({
  payload,
  type: ACTION_TYPES.ADD_ROUTES
});

export const localSaveRoute = (route: RouteData): ThunkResult<void> => async (dispatch, getState) => {
  try {
    const routes = getState().routes.savedRoutes;
    const { routeState } = getState().routes;
    const routeCopy = route;
    routeCopy.id = uuidv4();
    routeCopy.date = moment().toISOString();

    if (!routeCopy.id) throw new Error("No id has been set for the route");
    if (!routeCopy.date) throw new Error("No date has been set for this route");
    if (!routeCopy.coordinates.length) throw new Error("No coordinates found in the route details");

    dispatch(setPendingRouteState({ ...routeState, loading: true, finished: false }));

    await AsyncStorage.setItem(ROUTE_KEY, JSON.stringify([...routes, routeCopy]));

    dispatch(addRouteAction(routeCopy));
    dispatch(setPendingRouteState({ ...routeState, loading: false, finished: true, lastInsertId: routeCopy.id }));
  } catch (error) {
    // asyncStorage error
  }
};

export const clearLastInsertId = (): ThunkResult<void> => async (dispatch, getState) => {
  const { routeState } = getState().routes;
  dispatch(setPendingRouteState({ ...routeState, lastInsertId: null }));
};

export const localInitRoutes = async () => {
  await AsyncStorage.setItem(ROUTE_KEY, JSON.stringify([]));
};

export const localLoadRoutes = (): ThunkResult<void> => async (dispatch, getState) => {
  try {
    const stringifiedRoutes = await AsyncStorage.getItem(ROUTE_KEY);
    if (stringifiedRoutes) {
      const routes = JSON.parse(stringifiedRoutes);
      dispatch(updateRoutesAction(routes));
    } else {
      await localInitRoutes();
      dispatch(updateRoutesAction([]));
    }
  } catch (error) {
    // asyncStorage error
  }
};

export const localUpdateRoute = (routeData: RouteData): ThunkResult<void> => async (dispatch, getState) => {
  if (!routeData.id) {
    throw new Error("To update an existing route the updated route must have an id.");
  }

  const routes = getState().routes.savedRoutes;
  const { routeState } = getState().routes;

  if (!routes) {
    throw new Error("Cannot update the as no current route exists.");
  }

  const index = routes.findIndex(route => route.id === routeData.id);
  const updatedRoutes = update(routes, { [index]: { $set: routeData } });
  dispatch(setPendingRouteState({ ...routeState, loading: true }));
  dispatch(updateRoutesAction(updatedRoutes));
  try {
    await AsyncStorage.setItem(ROUTE_KEY, JSON.stringify(updatedRoutes));
    dispatch(setPendingRouteState({ ...routeState, loading: false }));
  } catch (error) {
    // async error
  }
};

export const localRemoveRouteById = (id: string): ThunkResult<void> => async (dispatch, getState) => {
  const routes = getState().routes.savedRoutes;
  const { routeState } = getState().routes;
  if (routes && routes.length) {
    const updatedRoutes = routes.filter(route => route.id && route.id !== id);
    dispatch(setPendingRouteState({ ...routeState, loading: true }));
    dispatch(updateRoutesAction(updatedRoutes));
    try {
      await AsyncStorage.setItem(ROUTE_KEY, JSON.stringify(updatedRoutes));
      dispatch(setPendingRouteState({ ...routeState, loading: false }));
    } catch (error) {
      // async storage error
    }
    return id;
  }
  return false;
};
