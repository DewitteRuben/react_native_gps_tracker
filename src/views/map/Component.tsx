import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { CText as Text, Button } from "../../components";
import { fbTest } from "../../services/firebase";
import { useLocationPermission, didCoordsUpdate, routeToFeature } from "./Utils";
import MapBoxMap from "../../components/MapBoxMap";

const map: React.FC = () => {
  const [isTracking, setTracking] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <MapBoxMap tracking={isTracking} />
      <View>
        <Button
          text={`${isTracking ? "Stop" : "Start"} Tracking`}
          onPress={() => setTracking(!isTracking)}></Button>
      </View>
    </View>
  );
};

export default map;
