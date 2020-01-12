import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";

export interface Props {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
  block?: boolean;
}

const Button: React.FC<Props> = ({ block, onPress, style, text, containerStyle }) => (
  <TouchableOpacity style={[styles.primary, block ? styles.block : null, containerStyle]} onPress={onPress}>
    <Text style={[styles.primaryText, style]}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
