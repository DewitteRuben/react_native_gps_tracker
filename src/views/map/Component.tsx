import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Button, CircleButton } from "../../components";
import MapBoxMap from "../../components/MapBoxMap";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const TAB_BAR_HEIGHT = 49;

const map: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapBoxMap />
      <View style={{ padding: 20 }}></View>
      {/* <BottomDrawer startUp={false} containerHeight={250} offset={TAB_BAR_HEIGHT}> */}
      {/* </BottomDrawer> */}
    </View>
  );
};

export default map;
