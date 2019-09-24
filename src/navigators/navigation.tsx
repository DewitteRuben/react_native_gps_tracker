import { createSwitchNavigator } from "react-navigation";
import { Home, Map } from "../views/index";

export const appNavigator = createSwitchNavigator(
  {
    Home: {
      screen: Home
    },
    Map: {
      screen: Map
    }
  },
  {
    initialRouteName: "Home"
  }
);
