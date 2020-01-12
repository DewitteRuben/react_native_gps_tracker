import React, { useState, useEffect } from "react";

import MapboxGL from "@react-native-mapbox-gl/maps";
import { View } from "react-native";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import { CText as Text } from "../../components";

const COORD_PRECISION = 0.000001;

const useLocationPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const hasBeenGranted = await MapboxGL.requestAndroidLocationPermissions();
      setHasPermission(hasBeenGranted);
    };

    requestPermissions();
  }, []);

  return hasPermission;
};

const routeToFeature = (route: MapboxGL.Coordinates[]) => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route.map(coord => [coord.longitude, coord.latitude])
    }
  } as GeoJSON.Feature;
};

const didCoordsUpdate = (cur: MapboxGL.Coordinates, prev: MapboxGL.Coordinates) => {
  return (
    Math.abs(cur.latitude - prev.latitude) > COORD_PRECISION ||
    Math.abs(cur.longitude - prev.longitude) > COORD_PRECISION
  );
};

const renderGpsDetails = (coords: MapboxGL.Coordinates) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    <Text text="accuracy: " />
    <Text text={coords.accuracy || 0} />
    <Text text="altitude: " />

    <Text text={coords.altitude || 0} />
    <Text text="latitude: " />

    <Text text={coords.latitude} />
    <Text text="longitude: " />

    <Text text={coords.longitude} />
    <Text text="speed: " />

    <Text text={coords.speed || 0} />

    <Text text="heading: " />
    <Text text={coords.heading || 0} />
  </View>
);

export { useLocationPermission, routeToFeature, renderGpsDetails, didCoordsUpdate };
