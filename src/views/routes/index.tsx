import { connect } from "react-redux";

import Component from "./Component";
import { StoreState } from "../../redux/store/types";

const mapStateToProps = (state: StoreState) => ({
  routes: state.routes.savedRoutes,
  distanceUnit: state.settings.distanceUnit
});

const mapDispatchToProps = () => ({});

const routeContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default routeContainer;
