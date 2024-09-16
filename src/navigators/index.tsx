import { createAppContainer } from "react-navigation";
import { Provider, batch } from "react-redux";
import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { appNavigator } from "./navigation";
import store from "../redux/store";
import { getTrackingIdAction, localLoadSettings } from "../redux/actions/settings";
import { localLoadRoutes } from "../redux/actions/routes";
import config from "../utils/env";

const Navigation = createAppContainer(appNavigator);

if (config.MAPBOX_ACCESS_TOKEN) {
  MapboxGL.setAccessToken(config.MAPBOX_ACCESS_TOKEN);
}

batch(() => {
  store.dispatch<any>(getTrackingIdAction());
  store.dispatch<any>(localLoadRoutes());
  store.dispatch<any>(localLoadSettings());
});

const app: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default app;
