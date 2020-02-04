import { connect } from "react-redux";

import Component from "./Component";
import { StoreState } from "../../redux/store/types";

const mapStateToProps = (state: StoreState) => ({
  distanceUnit: state.settings.distanceUnit,
  webRTC: state.settings.webRTC
});

const mapDispatchToProps = () => ({});

const mapContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default mapContainer;
