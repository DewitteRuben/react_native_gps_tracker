import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import styles from "./style";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "subtitle1" | "subtitle2";
type Align = "inherit" | "left" | "center" | "right" | "justify";

interface Props {
  bold?: boolean;
  style?: StyleProp<TextStyle>;
  text: string | number | null;
  green?: boolean;
  gray?: boolean;
  white?: boolean;
  variant?: Variant;
  align?: Align;
  fontSize?: number;
  onPress?: () => any;
}

const CText: React.FC<Props> = ({ bold, green, gray, style, variant, text, align, fontSize, onPress, white }) => {
  const { boldText, greenText, grayText, whiteText } = styles;
  return (
    <Text
      onPress={onPress}
      style={[
        bold ? boldText : styles.primaryText,
        green && greenText,
        white && whiteText,
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
