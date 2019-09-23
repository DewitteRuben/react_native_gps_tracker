import React, { useRef } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken(
  "pk.eyJ1IjoicnViZW5kZXdpdHRlIiwiYSI6ImNrMHNtcWhjZzAzd24zY3J4NDJwODhxeHoifQ.YsajnMm8yJlFW0kbkP4bpQ"
);

const map: React.FC = () => {
  let mapView;

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        ref={map => (mapView = map)}
        style={{ flex: 1 }}
      ></MapboxGL.MapView>
    </View>
  );
};

export default map;
