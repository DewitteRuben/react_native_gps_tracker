import React, { useRef } from "react";
import { CText as Text, Icon } from "../../components";
import { TextInput } from "react-native-paper";
import styles from "./styles";
import { TextInputProps } from "react-native-paper/lib/typescript/src/components/TextInput/TextInput";

interface Props extends TextInputProps {}

const input: React.FC<Props> = ({ label, disabled, style, onChange, onChangeText, value, defaultValue, editable }) => (
  <TextInput
    theme={{
      colors: {
        primary: styles.primary.color,
        disabled: styles.primary.color,
      }
    }}
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
