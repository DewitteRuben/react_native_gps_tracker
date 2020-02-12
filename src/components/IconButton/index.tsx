import React, { memo } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Icon, { IconTypes } from "../Icon";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

interface Props {
  onPress?: () => void;
  type: IconTypes;
  name: string;
  size?: number;
  style?: ViewStyle;
}

const iconButton = memo<Props>(({ name, onPress, type, size, style }) => {
  return (
    <TouchableOpacity style={[styles.mainContainer, style]} onPress={onPress}>
      <Icon type={type} name={name} size={size || 30} color={GLOBAL.MAIN.buttonGray} />
    </TouchableOpacity>
  );
});

export default iconButton;
