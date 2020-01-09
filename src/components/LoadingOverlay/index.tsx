import React from "react";
import { View } from "react-native";
import { Spinner } from "..";

const loadingOverlay: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner />
    </View>
  );
};

export default loadingOverlay;