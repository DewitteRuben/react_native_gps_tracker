import React, { memo } from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { View } from "react-native";
import CircleButton from "../CircleButton";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

interface Props {
  isTracking: boolean;
  hasTracked: boolean;
  onTrackFinish: () => void;
  onToggleTracking: () => void;
}

const trackFAB = memo<Props>(({ isTracking, hasTracked, onTrackFinish, onToggleTracking }) => {
  return (
    <View style={styles.mainContainer}>
      {isTracking && (
        <CircleButton
          disabled={!hasTracked}
          backgroundColor={hasTracked ? GLOBAL.MAIN.green : GLOBAL.MAIN.lightGray}
          containerStyle={styles.finishButtonContainer}
          onPress={onTrackFinish}
        >
          <Icon type={IconType.FontAwesome} color={GLOBAL.MAIN.white} size={26} name="flag-checkered" />
        </CircleButton>
      )}
      <CircleButton containerStyle={styles.trackButtonContainer} onPress={onToggleTracking}>
        <Icon
          type={IconType.MaterialCommunityIcons}
          color={GLOBAL.MAIN.buttonGray}
          size={32}
          name={isTracking ? "pause" : "map-marker-path"}
        />
      </CircleButton>
    </View>
  );
});

export default trackFAB;
