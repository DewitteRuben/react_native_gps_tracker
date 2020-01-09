import { connect } from "react-redux";

import Component from "./Component";
import { StoreState } from "../../redux/store/types";

const getRoutesById = (state: StoreState) => (id: string) => state.routes.savedRoutes.filter(route => route.id === id)[0];

const mapStateToProps = (state: StoreState) => ({
  getRoutesById: getRoutesById(state)
});

const mapDispatchToProps = () => ({});

const editRoute = connect(mapStateToProps, mapDispatchToProps)(Component);

export default editRoute;
