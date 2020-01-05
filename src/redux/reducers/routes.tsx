import { RouteState, RouteData } from "../store/types";
import { ACTION_TYPES } from "../constants/actionTypes";
import { IUpdateRoutesAction, IAddRouteAction, IPendingRouteStateAction, IRouteSaveState } from "../actions/routes";

const initialState: RouteState = {
  savedRoutes: [],
  routeState: { error: null, finished: true, loading: false, lastInsertId: null }
};

export default (
  state: RouteState = initialState,
  action: IUpdateRoutesAction | IAddRouteAction | IPendingRouteStateAction
): RouteState => {
  switch (action.type) {
    case ACTION_TYPES.SET_ROUTE_SAVING_STATE:
      const routeState = action.payload as IRouteSaveState;
      return { ...state, routeState: { ...routeState } };
    case ACTION_TYPES.ADD_ROUTES:
      const { savedRoutes } = state;
      const routeData = action.payload as RouteData;
      return { ...state, savedRoutes: [...savedRoutes, routeData] };
    case ACTION_TYPES.UPDATE_ROUTES:
      return { ...state, savedRoutes: action.payload as RouteData[] };
    default:
      return state;
  }
};
