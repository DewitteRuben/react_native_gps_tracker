import { connect } from "react-redux";

import { compose } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Component from "./Component";
import { StoreState } from "../../redux/store/types";
import { localUpdateDistanceUnit, localUpdateWebRTCState } from "../../redux/actions/settings";

const mapStateToProps = (state: StoreState) => ({
  distanceUnit: state.settings.distanceUnit,
  trackingId: state.settings.trackingId,
  webRTC: state.settings.webRTC
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  updateDistanceUnit: (unit: string) => dispatch(localUpdateDistanceUnit(unit)),
  updateWebRTCState: (state: boolean) => dispatch(localUpdateWebRTCState(state))
});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
