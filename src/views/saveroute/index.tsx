import { connect } from "react-redux";

import Component from "./Component";
import { StoreState } from "../../redux/store/types";

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = () => ({});

const saveRouteContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default saveRouteContainer;
