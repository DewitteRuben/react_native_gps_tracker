import { createSwitchNavigator } from "react-navigation";
import { Home, Map, Routes, Settings, SaveRoute, RouteDetail, EditRoute } from "../views/index";
import { createBottomTabNavigator } from "react-navigation-tabs";

export const MainTabs = createBottomTabNavigator(
  {
    Routes: {
      screen: Routes
    },
    Map: {
      screen: Map
    },
    Settings: {
      screen: Settings
    }
  },
  {
    tabBarOptions: {
      showLabel: true,
      activeTintColor: "#ffffff",
      inactiveTintColor: "#30be76",
      activeBackgroundColor: "#30be76",
      inactiveBackgroundColor: "#26985F"
    },
    initialRouteName: "Map"
  }
);

export const appNavigator = createSwitchNavigator(
  {
    Home: {
      screen: Home
    },
    Main: {
      screen: MainTabs
    },
    SaveRoute: {
      screen: SaveRoute
    },
    EditRoute: {
      screen: EditRoute
    },
    RouteDetail: {
      screen: RouteDetail
    }
  },
  {
    initialRouteName: "Home"
  }
);
