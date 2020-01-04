import React, { useMemo } from "react";
import { View } from "react-native";
import { CText as Text, SaveRouteForm } from "../../components";
import { GLOBAL } from "../../styles/global";
import * as geometry from "spherical-geometry-js";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useNavigationParam } from "react-navigation-hooks";
import { metersToMiles, metersToKilometers } from "../../utils/units";

interface Props {
  distanceUnit: string;
}

const saveRoute: React.FC<Props> = ({ distanceUnit }) => {
  const distance: { start: MapboxGL.Coordinates; end: MapboxGL.Coordinates } = useNavigationParam("distance");
  const duration: number = useNavigationParam("duration");

  const distanceInMeters = useMemo(() => {
    const { latitude: startLat, longitude: startLong } = distance.start;
    const { latitude: endLat, longitude: endLong } = distance.end;
    return geometry.computeDistanceBetween([startLat, startLong], [endLat, endLong]);
  }, [distance]);

  return (
    <>
      <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
        <Text text="Save route" bold variant="h2" />
        <SaveRouteForm distance={distanceInMeters.toString()} duration={duration.toString()} />
      </View>
    </>
  );
};
export default saveRoute;
