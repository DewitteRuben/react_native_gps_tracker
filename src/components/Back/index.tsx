import React from "react";
import { Image, TouchableOpacity, ViewProps, StyleProp } from "react-native";
import Text from "../CText";
import styles from "./styles";
import { GLOBAL } from "../../styles/global";

const backArrow = require("../..//assets/images/arrow-left.png");

interface Props {
  onPress?: () => void;
  style?: StyleProp<ViewProps>;
}

const backButton: React.FC<Props> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[GLOBAL.LAYOUT.justifySpaceBetween, GLOBAL.LAYOUT.alignCenter, GLOBAL.LAYOUT.flexRow]}
    >
      <Image style={styles.arrow} source={backArrow} />
      <Text text="Back" variant="subtitle1" />
    </TouchableOpacity>
  );
};

export default backButton;
