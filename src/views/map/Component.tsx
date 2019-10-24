import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { CText as Text, Button } from "../../components";
import * as GeoJSON from "@turf/helpers/lib/geojson";

const COORD_PRECISION = 0.000001;

MapboxGL.setAccessToken(
  "pk.eyJ1IjoicnViZW5kZXdpdHRlIiwiYSI6ImNrMHNtcWhjZzAzd24zY3J4NDJwODhxeHoifQ.YsajnMm8yJlFW0kbkP4bpQ",
);

const gpsDetails = (coords: MapboxGL.Coordinates) => (
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

let curLong = 0;
let curLat = 0;

const didCoordsUpdate = (coords: MapboxGL.Coordinates) => {
  return (
    Math.abs(curLat - coords.latitude) > COORD_PRECISION ||
    Math.abs(curLong - coords.longitude) > COORD_PRECISION
  );
};

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

const setRouteLineFeature = (route: MapboxGL.Coordinates[]) => {
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();

  const routeLineString: GeoJSON.Feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route.map(coord => [coord.longitude, coord.latitude]),
    },
  };
  setGeoJsonFeature(routeLineString);

  return geojsonFeature;
};

const map: React.FC = () => {
  const hasPermission = useLocationPermission();
  const [isTracking, setTracking] = useState(false);
  const [followUser, setFollowUser] = useState(false);
  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  let geojsonFeature = null;

  const onUserlocationUpdate = (location: MapboxGL.Location) => {
    if (curLat === 0 && curLong === 0) {
      curLong = location.coords.longitude;
      curLat = location.coords.latitude;
    }

    if (didCoordsUpdate(location.coords)) {
      setFollowUser(true);
      if (isTracking) {
        setRoute([...route, location.coords]);
        geojsonFeature = setRouteLineFeature(route);
      }

      curLong = location.coords.longitude;
      curLat = location.coords.latitude;
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        animated={true}
        onTouchMove={() => setFollowUser(false)}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}>
        <MapboxGL.UserLocation
          onUpdate={onUserlocationUpdate}
          visible={hasPermission}
          renderMode="normal"
        />
        <MapboxGL.Camera
          zoomLevel={12}
          followZoomLevel={12}
          followUserLocation={followUser}
          followUserMode="normal"
        />

        {geojsonFeature && (
          <MapboxGL.ShapeSource id="routeSource" shape={geojsonFeature}>
            <MapboxGL.LineLayer
              id="routeLine"
              style={{ lineWidth: 3, lineColor: "#F7455D" }}></MapboxGL.LineLayer>
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      <View>
        <Button
          text={`${isTracking ? "Stop" : "Start"} Tracking`}
          onPress={() => setTracking(!isTracking)}></Button>
      </View>
    </View>
  );
};

export default map;
