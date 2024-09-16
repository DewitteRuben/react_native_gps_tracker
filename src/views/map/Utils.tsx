import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { CText as Text } from "../../components";

const COORD_PRECISION = 0.000001;

type LocationStatus = "already-enabled" | "enabled" | "disabled";

const useLocationPermission = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>();

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const hasBeenGranted = await MapboxGL.requestAndroidLocationPermissions();
        if (hasBeenGranted) {
          const status = await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000
          });
          setLocationStatus(status);
        }
        setHasPermission(hasBeenGranted);
      } catch (error) {
        setHasPermission(false);
        setLocationStatus("disabled");
      }
    };

    requestPermissions();
  }, []);

  return { hasPermission, locationStatus };
};

const routeToFeature = (route: MapboxGL.Location["coords"][]) => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route.map(coord => [coord.longitude, coord.latitude])
    }
  } as GeoJSON.Feature;
};

const didCoordsUpdate = (cur: MapboxGL.Location["coords"], prev: MapboxGL.Location["coords"]) => {
  return (
    Math.abs(cur.latitude - prev.latitude) > COORD_PRECISION ||
    Math.abs(cur.longitude - prev.longitude) > COORD_PRECISION
  );
};

const renderGpsDetails = (coords: MapboxGL.Location["coords"]) => (
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
