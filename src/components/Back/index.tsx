import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { CText as Text } from "../../components";

interface Props {
  onPress?: () => void;
}

const backButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 0, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: 50 }}
    >
      <Image style={{ width: 14, height: 14 }} source={require("src/assets/images/arrow-left.png")}></Image>
      <Text text="Back" variant="subtitle1" />
    </TouchableOpacity>
  );
};

export default backButton;
