import { SettingsState } from "../store/types";
import { IUpdateDistanceUnitAction } from "../actions/settings";
import { ACTION_TYPES } from "../constants/actionTypes";

const initialState: SettingsState = {
  distanceUnit: "km"
};

export default (state: SettingsState = initialState, action: IUpdateDistanceUnitAction): SettingsState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DISTANCE_UNIT:
      return { ...state, distanceUnit: action.payload };
    default:
      return state;
  }
};
