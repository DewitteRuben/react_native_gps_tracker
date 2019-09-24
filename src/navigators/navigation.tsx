import { createStackNavigator } from "react-navigation-stack";
import { Home, Map } from "../views/index";

export const appNavigator = createStackNavigator(
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
