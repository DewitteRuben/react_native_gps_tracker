import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import styles from "./style";

interface Props {
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  text: string | number | null;
  green?: boolean;
  gray?: boolean;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "subtitle1" | "paragraph";
  align?: "inherit" | "left" | "center" | "right" | "justify";
  fontSize?: number;
  onPress?: () => any;
}

const CText: React.FC<Props> = ({ bold, green, gray, style, variant, text, align, fontSize, onPress }) => {
  const { boldText, greenText, grayText } = styles;
  return (
    <Text
      onPress={onPress}
      style={[
        bold ? boldText : styles.primaryText,
        green && greenText,
        variant && styles[variant],
        fontSize && { fontSize },
        gray && grayText,
        align && { textAlign: align },
        style
      ]}
    >
      {text}
    </Text>
  );
};

export default CText;
