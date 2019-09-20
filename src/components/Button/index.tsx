import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export interface Props {
  text: string;
  containerStyle?: object;
  style?: object;
  callback: () => any;
  block?: boolean;
}

const button = (props: Props) => (
  <TouchableOpacity
    style={[styles.primary, props.block ? styles.block : null, props.containerStyle]}
    onPress={props.callback}
  >
    <Text style={[styles.primaryText, props.style]}>{props.text}</Text>
  </TouchableOpacity>
);

export default button;
