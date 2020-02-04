import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { Checkbox as RNPCheckbox } from "react-native-paper";
import { CText as Text } from "..";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

interface Props {
  label?: string;
  onCheck?: (checked: boolean) => void;
}

const Checkbox: React.FC<Props> = ({ label, onCheck }) => {
  const [isWebRTCEnabled, setWebRTC] = useState(false);
  const handleCheckState = useCallback(() => setWebRTC(prevState => !prevState), []);

  useEffect(() => {
    if (onCheck) {
      onCheck(isWebRTCEnabled);
    }
  }, [onCheck, isWebRTCEnabled]);

  return (
    <View style={styles.checkboxContainer}>
      {label && <Text text={label} style={styles.checkboxInput} />}
      <RNPCheckbox
        onPress={handleCheckState}
        color={GLOBAL.MAIN.green}
        status={isWebRTCEnabled ? "checked" : "unchecked"}
      />
    </View>
  );
};

export default Checkbox;
