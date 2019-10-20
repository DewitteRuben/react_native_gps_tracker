import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { CText as Text, Button } from "../../components";

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

let curLat = 0;
let curLong = 0;

const didCoordsUpdate = (coords: MapboxGL.Coordinates) => {
  return (
    Math.abs(curLat - coords.latitude) > COORD_PRECISION ||
    Math.abs(curLong - coords.longitude) > COORD_PRECISION
  );
};

const map: React.FC = () => {
  const mapView = useRef(null);
  const [isTracking, setTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState<MapboxGL.Location>();
  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);

  const onUserlocationUpdate = (isTracking: boolean) => {
    return (location: MapboxGL.Location) => {
      if (curLat === 0 && curLong === 0) {
        curLat = location.coords.latitude;
        curLong = location.coords.longitude;
      }

      if (didCoordsUpdate(location.coords)) {
        setLocation(location);
        if (isTracking) {
          setRoute([...route, location.coords]);
        }
        curLat = location.coords.latitude;
        curLong = location.coords.longitude;
      }
    };
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const hasBeenGranted = await MapboxGL.requestAndroidLocationPermissions();
      setHasPermission(hasBeenGranted);
    };

    requestPermissions();
  }, []);

  console.log(location);
  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        ref={mapView}
        style={{ flex: 1 }}
        userTrackingMode={MapboxGL.UserTrackingModes.FollowWithHeading}>
        <MapboxGL.UserLocation
          onUpdate={onUserlocationUpdate(true)}
          visible={hasPermission}
        />
        <MapboxGL.Camera
          zoomLevel={16}
          followZoomLevel={16}
          followUserMode="normal"
          followUserLocation={true}
        />
      </MapboxGL.MapView>
      <View>{location && gpsDetails(location.coords)}</View>
      <View>
        <Text text="Text" />
      </View>
      <View>
        <Button
          text={(isTracking ? "Stop " : "Start ") + "Track"}
          onPress={() => setTracking(!isTracking)}></Button>
      </View>
    </View>
  );
};

export default map;
