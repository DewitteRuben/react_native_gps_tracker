import { SettingsState, ACTION_TYPES } from "../store/types";
import { IUpdateDistanceUnitAction } from "../actions/settings";

const initialState: SettingsState = {
  distanceUnit: "km",
  trackingId: ""
};

export default (state: SettingsState = initialState, action: IUpdateDistanceUnitAction): SettingsState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DISTANCE_UNIT:
      return { ...state, distanceUnit: action.payload };
    case ACTION_TYPES.UPDATE_TRACKING_ID:
      return { ...state, trackingId: action.payload };
    default:
      return state;
  }
};
