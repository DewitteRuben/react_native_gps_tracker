import React, { memo } from "react";
import { View } from "react-native";
import Icon from "../Icon";
import CircleButton from "../CircleButton";

interface Props {
  isTracking: boolean;
  hasTracked: boolean;
  onTrackFinish: () => void;
  onToggleTracking: () => void;
}

const trackFAB = memo<Props>(({ isTracking, hasTracked, onTrackFinish, onToggleTracking }) => {
  return (
    <View style={{ flex: 0, flexDirection: "row", marginTop: 10 }}>
      <View>
        {isTracking && (
          <CircleButton
            disabled={!hasTracked}
            backgroundColor={hasTracked ? "#30be76" : "#CCCCCC"}
            containerStyle={{ padding: 17 }}
            onPress={onTrackFinish}
          >
            <Icon type="FontAwesome" color={isTracking ? "#FFFFFF" : "#8B8B8B"} size={26} name="flag-checkered" />
          </CircleButton>
        )}
      </View>
      <View style={{ marginLeft: 10 }}>
        <CircleButton onPress={onToggleTracking}>
          <Icon
            type="MaterialCommunity"
            color="rgba(0, 0, 0, 0.54);"
            size={32}
            name={isTracking ? "pause" : "map-marker-path"}
          />
        </CircleButton>
      </View>
    </View>
  );
});

export default trackFAB;
