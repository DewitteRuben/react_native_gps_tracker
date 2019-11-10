import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Button } from "../../components";
import MapBoxMap from "../../components/MapBoxMap";

const map: React.FC = () => {
  const [isTracking, setTracking] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <MapBoxMap tracking={isTracking} />
      <View style={{ padding: 10 }}>
        <Button block text={`${isTracking ? "Stop" : "Start"} Tracking`} onPress={() => setTracking(!isTracking)} />
      </View>
    </View>
  );
};

export default map;
