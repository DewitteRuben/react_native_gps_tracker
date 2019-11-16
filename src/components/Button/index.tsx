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

const button = (props: Props) => (
  <TouchableOpacity
    style={[styles.primary, props.block ? styles.block : null, props.containerStyle]}
    onPress={props.onPress}
  >
    <Text style={[styles.primaryText, props.style]}>{props.text}</Text>
  </TouchableOpacity>
);

export default button;
