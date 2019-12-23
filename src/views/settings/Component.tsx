import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Button, CircleButton, Icon } from "../../components";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";

const settings: NavigationBottomTabScreenComponent = () => {
  return <View style={{ flex: 1 }}></View>;
};

settings.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }: RenderIconProps) => (
    <Icon type="FontAwesome" name="cog" color={focused ? "#ffffff" : "#30be76"} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default settings;
