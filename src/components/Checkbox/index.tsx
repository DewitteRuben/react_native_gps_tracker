import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { Checkbox as RNPCheckbox } from "react-native-paper";
import { CText as Text } from "..";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

interface Props {
  label?: string;
  onPress?: (checked: boolean) => void;
  checked?: boolean;
}

const Checkbox: React.FC<Props> = ({ label, onPress, checked = false }) => {
  const [isChecked, setChecked] = useState(checked);
  const handleCheckState = useCallback(() => setChecked(prevState => !prevState), []);

  useEffect(() => {
    if (onPress) {
      onPress(isChecked);
    }
  }, [onPress, isChecked]);

  return (
    <View style={styles.checkboxContainer}>
      {label && <Text text={label} onPress={handleCheckState} style={styles.checkboxInput} />}
      <RNPCheckbox onPress={handleCheckState} color={GLOBAL.MAIN.green} status={isChecked ? "checked" : "unchecked"} />
    </View>
  );
};

export default Checkbox;
