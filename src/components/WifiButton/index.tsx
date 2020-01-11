import React from "react";

import { View } from "react-native";

import Icon from "react-native-vector-icons/Feather";

interface Props {
  liveUpdate: boolean;
  onToggleLive: () => void;
}

const wifiButton: React.FC<Props> = ({ liveUpdate, onToggleLive }) => {
  return (
    <View style={{ position: "absolute", zIndex: 10, top: 0, right: -8 }}>
      <Icon.Button
        name={liveUpdate ? "wifi" : "wifi-off"}
        size={30}
        onPress={onToggleLive}
        color="rgba(0, 0, 0, 0.54);"
        backgroundColor="#FAFAFA"
      />
    </View>
  );
};

export default wifiButton;
