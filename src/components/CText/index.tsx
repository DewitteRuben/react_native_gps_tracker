import React from "react";
import { Text } from "react-native";
import styles from "./style";

export interface Props {
  bold?: boolean;
  style?: object;
  text: string | number | null;
  green?: boolean;
  gray?: boolean;
  h1?: boolean;
}

const CText: React.FC<Props> = props => (
  <Text
    style={[
      props.bold ? styles.boldText : styles.primaryText,
      props.green && styles.greenText,
      props.h1 && styles.h1,
      props.gray && styles.grayText,
      props.style
    ]}
  >
    {props.text}
  </Text>
);

export default CText;
