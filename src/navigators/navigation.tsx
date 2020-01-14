import { createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Home, Map, Routes, Settings, SaveRoute, RouteDetail, EditRoute } from "../views/index";
import { GLOBAL } from "../styles/global";

export enum ROUTES {
  HOME = "Home",
  MAIN = "Main",
  SAVE_ROUTE = "SaveRoute",
  EDIT_ROUTE = "EditRoute",
  ROUTE_DETAIL = "RouteDetail",
  TAB_ROUTES = "Routes",
  TAB_MAP = "Map",
  TAB_SETTINGS = "Settings"
}

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
      activeTintColor: GLOBAL.MAIN.lighterWhite,
      inactiveTintColor: GLOBAL.MAIN.green,
      activeBackgroundColor: GLOBAL.MAIN.green,
      inactiveBackgroundColor: GLOBAL.MAIN.lightGreen
    },
    initialRouteName: ROUTES.TAB_MAP
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
