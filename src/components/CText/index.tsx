import React from "react";
import { Text } from "react-native";
import styles from "./style";

export interface Props {
  bold?: boolean;
  style?: object;
  text: string;
}

const CText: React.FC<Props> = props => (
  <Text
    style={[props.bold ? styles.boldText : styles.primaryText, props.style]}
  >
    {props.text}
  </Text>
);

export default CText;
