import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Text from "../CText";

const backArrow = require("../..//assets/images/arrow-left.png");

interface Props {
  onPress?: () => void;
}

const backButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 0, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: 50 }}
    >
      <Image style={{ width: 14, height: 14 }} source={backArrow} />
      <Text text="Back" variant="subtitle1" />
    </TouchableOpacity>
  );
};

export default backButton;
