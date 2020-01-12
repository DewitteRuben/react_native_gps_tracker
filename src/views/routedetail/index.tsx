import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";
import { compose } from "redux";
import Component from "./Component";
import { StoreState } from "../../redux/store/types";
import { localRemoveRouteById } from "../../redux/actions/routes";

const mapStateToProps = (state: StoreState) => ({
  distanceUnit: state.settings.distanceUnit,
  routes: state.routes.savedRoutes
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  deleteRoute: (routeId: string) => dispatch(localRemoveRouteById(routeId))
});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
