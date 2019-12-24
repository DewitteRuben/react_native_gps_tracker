import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Button, CircleButton, Icon } from "../../components";
import MapBoxMap from "../../components/MapBoxMap";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
  NavigationStackOptions,
  NavigationStackProp
} from "react-navigation-stack";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { GLOBAL } from "../../styles/global";

interface Props extends NavigationStackScreenProps {
  // your props...
}

const map: NavigationStackScreenComponent<Props> = () => {
  return (
    <View style={GLOBAL.LAYOUT.container}>
      <MapBoxMap />
    </View>
  );
};

map.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }: RenderIconProps) => (
    <Icon type="Foundation" name="map" color={focused ? "#ffffff" : "#30be76"} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, NavigationParams>, unknown>
>;

export default map;
