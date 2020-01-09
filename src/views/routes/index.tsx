import { connect } from "react-redux";

import Component from "./Component";
import { StoreState } from "../../redux/store/types";

const sortRoutesByDate = (state: StoreState) => {
  return state.routes.savedRoutes.sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

const mapStateToProps = (state: StoreState) => ({
  routes: sortRoutesByDate(state),
  distanceUnit: state.settings.distanceUnit
});

const mapDispatchToProps = () => ({});

const routeContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default routeContainer;
