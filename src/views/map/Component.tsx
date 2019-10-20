import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { CText, Button } from "../../components";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoicnViZW5kZXdpdHRlIiwiYSI6ImNrMHNtcWhjZzAzd24zY3J4NDJwODhxeHoifQ.YsajnMm8yJlFW0kbkP4bpQ",
);

const gpsDetails = (coords: MapboxGL.Coordinates) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    <CText text="accuracy: " />
    <CText text={coords.accuracy || 0} />
    <CText text="altitude: " />

    <CText text={coords.altitude || 0} />
    <CText text="latitude: " />

    <CText text={coords.latitude} />
    <CText text="longitude: " />

    <CText text={coords.longitude} />
    <CText text="speed: " />

    <CText text={coords.speed || 0} />

    <CText text="heading: " />
    <CText text={coords.heading || 0} />
  </View>
);

const map: React.FC = () => {
  const mapView = useRef(null);
  const [isTracking, setTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [location, setLocation] = useState<MapboxGL.Location>();
  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);

  const onUserlocationUpdate = (isTracking: boolean) => {
    return (location: MapboxGL.Location) => {
      setLocation(location);
      if (isTracking) {
        setRoute([...route, location.coords]);
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

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        ref={mapView}
        style={{ flex: 1 }}
        userTrackingMode={MapboxGL.UserTrackingModes.FollowWithHeading}>
        <MapboxGL.UserLocation
          onUpdate={onUserlocationUpdate(isTracking)}
          visible={hasPermission}
        />
        <MapboxGL.Camera
          zoomLevel={16}
          followZoomLevel={16}
          followUserMode="normal"
          followUserLocation={true}
        />
      </MapboxGL.MapView>
      <View></View>
      {location && gpsDetails(location.coords)}
      <View>
        <Button
          text={(isTracking ? "Stop " : "Start ") + "Track"}
          onPress={() => setTracking(!isTracking)}></Button>
      </View>
    </View>
  );
};

export default map;
