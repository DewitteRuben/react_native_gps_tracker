import { Action, ActionCreator } from "redux";

import { ACTION_TYPES } from "../../constants/actionTypes";

export interface IUpdateDistanceUnitAction extends Action {
  payload: string;
}

export const updateDistanceUnitAction: ActionCreator<IUpdateDistanceUnitAction> = (payload: string) => ({
  payload,
  type: ACTION_TYPES.UPDATE_DISTANCE_UNIT
});
