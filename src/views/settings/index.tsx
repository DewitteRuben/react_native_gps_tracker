import { connect } from "react-redux";

import { compose } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Component from "./Component";
import { StoreState } from "../../redux/store/types";
import { updateDistanceUnitAction } from "../../redux/actions/settings";

const mapStateToProps = (state: StoreState) => ({
  distanceUnit: state.settings.distanceUnit,
  trackingId: state.settings.trackingId
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  updateDistanceUnit: (unit: string) => dispatch(updateDistanceUnitAction(unit))
});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
