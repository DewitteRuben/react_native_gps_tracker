import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  default as GPS,
  GeolocationResponse,
  GeolocationError,
} from "@react-native-community/geolocation";
import { CText } from "../../components";

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
    console.log(position);
    setGeolocation({ ...geolocation, position, error: null });
  };
};

const setError = (
  setGeolocation: React.Dispatch<React.SetStateAction<IGeolocation>>,
  geolocation: IGeolocation,
) => {
  return (error: GeolocationError) => {
    setGeolocation({ ...geolocation, error, position: null });
  };
};

const watchCurPos = (
  setGeolocation: React.Dispatch<React.SetStateAction<IGeolocation>>,
  geolocation: IGeolocation,
) => {
  return GPS.watchPosition(
    setResponse(setGeolocation, geolocation),
    setError(setGeolocation, geolocation),
    gpsOptions,
  );
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

const map: React.FC = () => {
  const [geolocation, setGeolocation] = useState<IGeolocation>({
    position: null,
    error: null,
  });
  const mapView = useRef(null);
  console.log(mapView);

  useEffect(() => {
    const watchId = watchCurPos(setGeolocation, geolocation);

    return () => {
      GPS.clearWatch(watchId);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        ref={mapView}
        style={{ flex: 1 }}
        showUserLocation={true}>
        {geolocation.position && (
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[3.1188, 51.09217]}
          />
        )}
        <MapboxGL.PointAnnotation
          id={"0"}
          coordinate={[3.1188, 51.09217]}
          title={"Home"}>
          <MapboxGL.Callout title="Home" />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
      <View></View>
      {gpsDetails(geolocation)}
    </View>
  );
};

export default map;
