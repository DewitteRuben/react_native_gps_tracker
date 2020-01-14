import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import { NavigationStackOptions, NavigationStackProp } from "react-navigation-stack";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import { computeDistanceBetween } from "spherical-geometry-js";
import { CText as Text, Icon } from "../../components";
import TrackingMap from "../../components/TrackingMap";
import { GLOBAL } from "../../styles/global";
import { durationToTime, msPerMeterToUnitPerHour } from "../../utils/time";
import { metersToUnit } from "../../utils/units";

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

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Map: NavigationBottomTabScreenFC = ({ distanceUnit }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedDistance, setElapsedDistance] = useState(0);
  const [distancePerHour, setDistancePerHour] = useState(0);
  const [tracking, setTracking] = useState(false);

  const onTimerUpdate = (duration: number) => {
    setElapsedTime(duration);
  };

  const onRouteUpdate = (route: MapboxGL.Coordinates[]) => {
    const start = route[0];
    const end = route[route.length - 1];

    const from = { lat: start.latitude, long: start.longitude };
    const to = { lat: end.latitude, long: end.longitude };
    const distance = computeDistanceBetween(from, to);
    setElapsedDistance(distance);
  };

  const formattedTime = durationToTime(elapsedTime);

  const formattedDistance = useMemo(() => metersToUnit(elapsedDistance, distanceUnit).toFixed(2), [
    distanceUnit,
    elapsedDistance
  ]);

  const onTrackToggle = useCallback((t: boolean) => {
    setTracking(t);
  }, []);

  useInterval(() => {
    if (tracking) {
      setDistancePerHour(msPerMeterToUnitPerHour(elapsedDistance, elapsedTime, distanceUnit));
    }
  }, 5000);

  return (
    <View style={GLOBAL.LAYOUT.container}>
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: GLOBAL.MAIN.green,
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 0, alignItems: "center" }}>
            <Text variant="h3" white text={formattedDistance} />
            <Text variant="h3" white text={distanceUnit} />
          </View>
        </View>
        <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text variant="h1" white text={formattedTime} />
        </View>
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 0, alignItems: "center" }}>
            <Text variant="h3" white text={distancePerHour.toFixed(2)} />
            <Text variant="h3" white text={`${distanceUnit}/h`} />
          </View>
        </View>
      </View>
      <TrackingMap onTrackToggle={onTrackToggle} onTimerUpdate={onTimerUpdate} onRouteUpdate={onRouteUpdate} />
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
