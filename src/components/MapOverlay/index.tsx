import * as React from "react";
import { View, Dimensions } from "react-native";

const mapOverlay: React.FC = ({ children }) => {
  return (
    <View style={{ zIndex: 100, position: "absolute", bottom: 20, right: 15 }}>
      <View style={{ flex: 0, alignItems: "flex-end" }}>{children}</View>
    </View>
  );
};

export default mapOverlay;
