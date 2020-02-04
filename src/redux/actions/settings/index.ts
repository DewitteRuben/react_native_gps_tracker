import { Action, ActionCreator } from "redux";
import { AsyncStorage } from "react-native";
import getUUID from "../../../utils/uuid";
import { ACTION_TYPES, ThunkResult, SettingsState } from "../../store/types";

const SETTINGS_KEY = "STORE_SETTINGS";

export interface IUpdateDistanceUnitAction extends Action {
  payload: string;
}

export interface IUpdateTrackingIdAction extends Action {
  payload: string;
}

export interface IUpdateWebRTCStateAction extends Action {
  payload: boolean;
}

export interface IUpdateSettingsState extends Action {
  payload: SettingsState;
}

export const updateSettingsState: ActionCreator<IUpdateSettingsState> = (payload: SettingsState) => ({
  payload,
  type: ACTION_TYPES.UPDATE_SETTINGS_STATE
});

export const updateTrackingIdAction: ActionCreator<IUpdateTrackingIdAction> = (payload: string) => ({
  payload,
  type: ACTION_TYPES.UPDATE_TRACKING_ID
});

export const updateDistanceUnitAction: ActionCreator<IUpdateDistanceUnitAction> = (payload: string) => ({
  payload,
  type: ACTION_TYPES.UPDATE_DISTANCE_UNIT
});

export const updateWebRTCStateAction: ActionCreator<IUpdateWebRTCStateAction> = (payload: boolean) => ({
  payload,
  type: ACTION_TYPES.UPDATE_WEBRTC_STATE
});

export const getTrackingIdAction = (): ThunkResult<void> => async dispatch => {
  try {
    const trackingId = await getUUID();
    dispatch(updateTrackingIdAction(trackingId));
  } catch (error) {
    //
  }
};

export const localUpdateDistanceUnit = (distanceUnit: string): ThunkResult<void> => async (dispatch, getState) => {
  if (!distanceUnit) throw new Error("No distance unit was passed.");
  const { settings } = getState();
  try {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...settings, distanceUnit }));
    dispatch(updateDistanceUnitAction(distanceUnit));
  } catch (error) {
    //
  }
};

export const localUpdateWebRTCState = (webRTC: boolean): ThunkResult<void> => async (dispatch, getState) => {
  if (webRTC === undefined || webRTC === null) throw new Error("No distance unit was passed.");
  const { settings } = getState();
  try {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...settings, webRTC }));
    dispatch(updateWebRTCStateAction(webRTC));
  } catch (error) {
    //
  }
};

export const localInitSettings = (): ThunkResult<void> => async (dispatch, getState) => {
  const { settings } = getState();
  return AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const localLoadSettings = (): ThunkResult<void> => async (dispatch, getState) => {
  try {
    const stringifiedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (stringifiedSettings) {
      const settings = JSON.parse(stringifiedSettings);
      dispatch(updateSettingsState(settings));
    } else {
      localInitSettings();
    }
  } catch (error) {
    //
  }
};
