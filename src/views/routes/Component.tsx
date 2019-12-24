import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Icon, RouteItem, CText } from "../../components";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";

const routes: NavigationBottomTabScreenComponent = () => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <CText bold variant="h1" text="Saved Routes" style={{ marginBottom: 10 }} />
      <RouteItem
        title="Funky Bus Trip"
        type="bus"
        startPoint="Bruges"
        endPoint="Frankfurt"
        date={new Date()}
        distance={10}
        duration={new Date()}
      ></RouteItem>
    </View>
  );
};

routes.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }: RenderIconProps) => (
    <Icon type="MaterialCommunity" name="map-marker-path" color={focused ? "#ffffff" : "#30be76"} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default routes;
