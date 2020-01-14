import React, { memo } from "react";

import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

interface Props {
  liveUpdate: boolean;
  onToggleLive: () => void;
}

const wifiButton = memo<Props>(({ liveUpdate, onToggleLive }) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onToggleLive}>
      <Icon name={liveUpdate ? "wifi" : "wifi-off"} size={30} color={GLOBAL.MAIN.buttonGray} />
    </TouchableOpacity>
  );
});

export default wifiButton;
