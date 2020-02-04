import { SettingsState, ACTION_TYPES } from "../store/types";
import { IUpdateDistanceUnitAction, IUpdateTrackingIdAction, IUpdateWebRTCStateAction } from "../actions/settings";

const initialState: SettingsState = {
  distanceUnit: "km",
  trackingId: "",
  webRTC: false
};

export default (
  state: SettingsState = initialState,
  action: IUpdateDistanceUnitAction | IUpdateTrackingIdAction | IUpdateWebRTCStateAction
): SettingsState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DISTANCE_UNIT:
      return { ...state, distanceUnit: action.payload as string };
    case ACTION_TYPES.UPDATE_TRACKING_ID:
      return { ...state, trackingId: action.payload as string };
    case ACTION_TYPES.UPDATE_WEBRTC_STATE:
      return { ...state, webRTC: action.payload as boolean };
    default:
      return state;
  }
};
