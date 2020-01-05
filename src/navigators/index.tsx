import { createAppContainer } from "react-navigation";
import { appNavigator } from "./../navigators/navigation";
import { Provider, batch } from "react-redux";
import React, { useEffect } from "react";
import store from "../redux/store";
import { getTrackingIdAction } from "../redux/actions/settings";
import { localLoadRoutes } from "../redux/actions/routes";

const Navigation = createAppContainer(appNavigator);

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
