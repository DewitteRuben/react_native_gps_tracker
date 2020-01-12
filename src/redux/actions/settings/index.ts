import { Action, ActionCreator } from "redux";
import getUUID from "../../../utils/uuid";
import { ACTION_TYPES, ThunkResult } from "../../store/types";

export interface IUpdateDistanceUnitAction extends Action {
  payload: string;
}

export interface IUpdateTrackingIdAction extends Action {
  payload: string;
}

export const updateTrackingIdAction: ActionCreator<IUpdateTrackingIdAction> = (payload: string) => ({
  payload,
  type: ACTION_TYPES.UPDATE_TRACKING_ID
});

export const updateDistanceUnitAction: ActionCreator<IUpdateDistanceUnitAction> = (payload: string) => ({
  payload,
  type: ACTION_TYPES.UPDATE_DISTANCE_UNIT
});

export const getTrackingIdAction = (): ThunkResult<void> => async dispatch => {
  try {
    const trackingId = await getUUID();
    dispatch(updateTrackingIdAction(trackingId));
  } catch (error) {
    //
  }
};
