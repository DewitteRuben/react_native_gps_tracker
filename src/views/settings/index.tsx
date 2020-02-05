import { connect } from "react-redux";

import { compose } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Component from "./Component";
import { StoreState, SettingsState } from "../../redux/store/types";
import { localUpdateDistanceUnit, localUpdateWebRTCState, updateSettings } from "../../redux/actions/settings";

const mapStateToProps = (state: StoreState) => ({
  distanceUnit: state.settings.distanceUnit,
  trackingId: state.settings.trackingId,
  webRTC: state.settings.webRTC,
  defaultZoom: state.settings.defaultZoom,
  minDisplacement: state.settings.minDisplacement
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  updateDistanceUnit: (unit: string) => dispatch(localUpdateDistanceUnit(unit)),
  updateWebRTCState: (state: boolean) => dispatch(localUpdateWebRTCState(state)),
  updateSettingsState: ({ defaultZoom, distanceUnit, minDisplacement, trackingId, webRTC }: Partial<SettingsState>) =>
    dispatch(updateSettings({ defaultZoom, distanceUnit, minDisplacement, trackingId, webRTC }))
});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
