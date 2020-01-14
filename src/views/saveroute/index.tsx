import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";
import { compose } from "redux";
import Component from "./Component";
import { StoreState, RouteData } from "../../redux/store/types";
import { localSaveRoute, clearLastInsertId } from "../../redux/actions/routes";

const mapStateToProps = (state: StoreState) => ({
  routeState: state.routes.routeState,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  saveRoute: (route: RouteData) => dispatch(localSaveRoute(route)),
  clearLastId: () => dispatch(clearLastInsertId())
});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
