import React, { useState, useMemo, useEffect } from "react";
import { View } from "react-native";
import { NavigationStackOptions, NavigationStackProp } from "react-navigation-stack";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import * as geometry from "spherical-geometry-js";
import { CText as Text, Icon } from "../../components";
import TrackingMap from "../../components/TrackingMap";
import { GLOBAL } from "../../styles/global";
import { durationToTime } from "../../utils/time";
import { prettyDistance } from "../../utils/units";

interface NavigationBottomTabScreenComponent {
  navigationOptions?: NavigationScreenConfig<
    NavigationBottomTabOptions,
    NavigationTabProp<NavigationRoute, NavigationParams>,
    unknown
  >;
}

interface Props {
  distanceUnit: string;
}

interface NavigationBottomTabScreenFC extends React.FC<Props>, NavigationBottomTabScreenComponent {}

const Map: NavigationBottomTabScreenFC = ({ distanceUnit }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedDistance, setElapsedDistance] = useState(0);

  const onTimerUpdate = (duration: number) => {
    setElapsedTime(duration);
  };

  const onRouteUpdate = (route: MapboxGL.Coordinates[]) => {
    const start = route[0];
    const end = route[route.length - 1];

    const distance = geometry.computeDistanceBetween([start.latitude, start.longitude], [end.latitude, end.longitude]);
    setElapsedDistance(distance);
  };

  const formattedTime = durationToTime(elapsedTime);
  const formattedDistance = prettyDistance(elapsedDistance.toString(), distanceUnit);

  return (
    <View style={GLOBAL.LAYOUT.container}>
      <View
        style={{
          width: "100%",
          paddingVertical: 18,
          paddingHorizontal: 20,
          backgroundColor: GLOBAL.MAIN.green,
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0, alignItems: "center" }}>
            <Text variant="h3" white text={formattedDistance} />
          </View>
        </View>
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="h1" white text={formattedTime} />
        </View>
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0, alignItems: "center" }}>
            <Text variant="h3" white text="0.32" />
            <Text variant="h3" white text="km/h" />
          </View>
        </View>
      </View>
      <TrackingMap onTimerUpdate={onTimerUpdate} onRouteUpdate={onRouteUpdate} />
    </View>
  );
};

Map.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }: RenderIconProps) => (
    <Icon type="Foundation" name="map" color={focused ? "#ffffff" : "#30be76"} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationStackProp<NavigationRoute, NavigationParams>, unknown>
>;

export default Map;
