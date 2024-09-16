import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

export interface Props {
  containerStyle?: object;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => any;
}

const circleButton: React.FC<Props> = ({ children, onPress, style, containerStyle, backgroundColor, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.primary, containerStyle, { backgroundColor: backgroundColor || styles.primary.backgroundColor }]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export default circleButton;
