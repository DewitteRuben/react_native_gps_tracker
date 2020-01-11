import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { View } from "react-native";
import { CText as Text, Button, CircleButton, Icon } from "../../components";
import TrackingMap from "../../components/TrackingMap";
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
  NavigationStackOptions,
  NavigationStackProp
} from "react-navigation-stack";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { GLOBAL } from "../../styles/global";
import MapboxGL from "@react-native-mapbox-gl/maps";
import moment from "moment";
import prettyMilliseconds from "pretty-ms";
import { durationToTime } from "../../utils/time";

interface Props extends NavigationStackScreenProps {
  // your props...
}

const map: NavigationStackScreenComponent<Props> = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const onTrackUpdate = (distance: MapboxGL.Coordinates[], duration: number) => {
    setElapsedTime(duration);
  };

  const formattedTime = useMemo(() => durationToTime(elapsedTime), [elapsedTime]);

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
            <Text variant="h3" white text="1.023,0" />
            <Text variant="h3" white text="km" />
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
      <TrackingMap onTrackUpdate={onTrackUpdate} />
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
