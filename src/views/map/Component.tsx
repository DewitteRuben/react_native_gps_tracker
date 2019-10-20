import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation, {
  default as GPS,
  GeolocationResponse,
  GeolocationError,
} from "@react-native-community/geolocation";
import { CText, Button } from "../../components";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoicnViZW5kZXdpdHRlIiwiYSI6ImNrMHNtcWhjZzAzd24zY3J4NDJwODhxeHoifQ.YsajnMm8yJlFW0kbkP4bpQ",
);

interface IGeolocation {
  position: GeolocationResponse | null;
  error: GeolocationError | null;
}

const setResponse = (
  setGeolocation: React.Dispatch<React.SetStateAction<IGeolocation>>,
  geolocation: IGeolocation,
) => {
  return (position: GeolocationResponse) => {
    setGeolocation({ ...geolocation, position, error: null });
  };
};

const useTrackLocation = (routed: boolean) => {
  const [route, setRoute] = useState<ICoordinate[]>([]);
  const [geolocation, setGeolocation] = useState<IGeolocation>({
    position: null,
    error: null,
  });

  useEffect(() => {
    const watchId = GPS.watchPosition(
      (position: GeolocationResponse) => {
        setResponse(setGeolocation, geolocation)(position);
        if (routed) {
          console.log("is saving route");
          setRoute([
            ...route,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ]);
        }
      },
      setError(setGeolocation, geolocation),
      gpsOptions,
    );

    return () => GPS.clearWatch(watchId);
  }, [routed]);
  return [route, geolocation];
};

const setError = (
  setGeolocation: React.Dispatch<React.SetStateAction<IGeolocation>>,
  geolocation: IGeolocation,
) => {
  return (error: GeolocationError) => {
    setGeolocation({ ...geolocation, error, position: null });
  };
};

const gpsOptions = {
  enableHighAccuracy: true,
};

const gpsDetails = (geolocation: IGeolocation) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
    <CText text="accuracy: " />
    <CText
      text={geolocation.position && geolocation.position.coords.accuracy}
    />
    <CText text="altitude: " />

    <CText
      text={geolocation.position && geolocation.position.coords.altitude}
    />
    <CText text="altitudeAccuracy: " />

    <CText
      text={
        geolocation.position && geolocation.position.coords.altitudeAccuracy
      }
    />
    <CText text="latitude: " />

    <CText
      text={geolocation.position && geolocation.position.coords.latitude}
    />
    <CText text="longitude: " />

    <CText
      text={geolocation.position && geolocation.position.coords.longitude}
    />
    <CText text="speed: " />

    <CText text={geolocation.position && geolocation.position.coords.speed} />

    <CText text="heading: " />
    <CText text={geolocation.position && geolocation.position.coords.heading} />
  </View>
);

interface ICoordinate {
  latitude: number;
  longitude: number;
}

const map: React.FC = () => {
  const mapView = useRef(null);
  const [isTracking, setTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const [route, geolocation] = useTrackLocation(isTracking) as [
    ICoordinate[],
    IGeolocation,
  ];

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
        <MapboxGL.UserLocation visible={hasPermission} />
        <MapboxGL.Camera
          zoomLevel={16}
          followZoomLevel={16}
          followUserMode="normal"
          followUserLocation={true}
        />
      </MapboxGL.MapView>
      <View></View>
      {gpsDetails(geolocation)}
      <View>
        <Button
          text={(isTracking ? "Stop " : "Start ") + "Track"}
          onPress={() => setTracking(!isTracking)}></Button>
      </View>
    </View>
  );
};

export default map;
