import { createAppContainer } from "react-navigation";
import { Provider, batch } from "react-redux";
import React, { useEffect } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { appNavigator } from "./navigation";
import store from "../redux/store";
import { getTrackingIdAction } from "../redux/actions/settings";
import { localLoadRoutes } from "../redux/actions/routes";
import config from "../config";

const Navigation = createAppContainer(appNavigator);

MapboxGL.setAccessToken(config.mapbox.accessToken);
batch(() => {
  store.dispatch<any>(getTrackingIdAction());
  store.dispatch<any>(localLoadRoutes());
});

const app: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default app;
