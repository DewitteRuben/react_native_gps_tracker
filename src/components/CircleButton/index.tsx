import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons";

export interface Props {
  containerStyle?: object;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
}

const circleButton: React.FC<Props> = ({ children, onPress, style, containerStyle, backgroundColor }) => (
  <TouchableOpacity
    style={[styles.primary, containerStyle, { backgroundColor: backgroundColor || styles.primary.backgroundColor }]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export default circleButton;
