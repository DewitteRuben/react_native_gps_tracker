import { createAppContainer } from "react-navigation";
import { appNavigator } from "./../navigators/navigation";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import store from "../redux/store";
import { getTrackingIdAction } from "../redux/actions/settings";

const Navigation = createAppContainer(appNavigator);

store.dispatch<any>(getTrackingIdAction());

const app: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default app;
