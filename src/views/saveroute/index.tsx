import { connect } from "react-redux";

import Component from "./Component";
import { StoreState, RouteData } from "../../redux/store/types";
import { ThunkDispatch } from "redux-thunk";
import { localSaveRoute, clearLastInsertId } from "../../redux/actions/routes";
import { compose } from "redux";

const mapStateToProps = (state: StoreState) => ({
  routeState: state.routes.routeState
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  saveRoute: (route: RouteData) => dispatch(localSaveRoute(route)),
  clearLastId: () => dispatch(clearLastInsertId())
});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
