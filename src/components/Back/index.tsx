import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { CText as Text } from "../../components";

interface Props {
  onPress?: () => void;
  size?: "1x" | "2x" | "3x";
}

const backButton: React.FC<Props> = ({ size, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 0, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}
    >
      <Image style={{ width: 14, height: 14 }} source={require("src/assets/images/arrow-left.png")}></Image>
      <Text text="Back" variant="subtitle1" />
    </TouchableOpacity>
  );
};

export default backButton;
