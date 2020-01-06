import { connect } from "react-redux";

import Component from "./Component";
import { ThunkDispatch } from "redux-thunk";
import { compose } from "redux";
import { StoreState } from "../../redux/store/types";

const mapStateToProps = (state: StoreState) => ({
  routes: state.routes.savedRoutes
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({});

export default compose<React.ComponentType<any>>(connect(mapStateToProps, mapDispatchToProps))(Component);
