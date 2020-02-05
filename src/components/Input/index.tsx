import React, { useRef } from "react";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/src/components/TextInput/TextInput";
import styles from "./styles";

type Props = TextInputProps;

const input: React.FC<Props> = ({
  label,
  disabled,
  style,
  onChange,
  onChangeText,
  value,
  defaultValue,
  editable,
  error,
  keyboardType
}) => (
  <TextInput
    theme={{
      colors: {
        primary: styles.primary.color,
        disabled: styles.primary.color
      }
    }}
    keyboardType={keyboardType}
    error={error}
    editable={editable}
    disabled={disabled}
    onChange={onChange}
    value={value}
    defaultValue={defaultValue}
    onChangeText={onChangeText}
    style={[style, styles.primary]}
    selectionColor={styles.primary.color}
    underlineColor={styles.primary.color}
    label={label}
  />
);

export default input;
