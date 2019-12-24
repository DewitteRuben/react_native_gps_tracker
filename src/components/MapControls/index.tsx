import * as React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { CircleButton, Icon as CIcon } from "..";

interface Props {
  isTracking: boolean;
  liveUpdate: boolean;
  onPressTrack: () => void;
  onPressFinish: () => void;
  onPressToggleLive: () => void;
}

const mapControls: React.FC<Props> = React.memo(
  ({ isTracking, liveUpdate, onPressToggleLive, onPressTrack, onPressFinish }) => {
    return (
      <>
        <View style={{ position: "absolute", zIndex: 10, top: 0, right: -8 }}>
          <Icon.Button
            name={liveUpdate ? "wifi" : "wifi-off"}
            size={30}
            onPress={onPressToggleLive}
            color="rgba(0, 0, 0, 0.54);"
            backgroundColor="#FAFAFA"
          />
        </View>
        <View style={{ position: "absolute", zIndex: 10, bottom: 20, right: 15 }}>
          <CircleButton onPress={onPressTrack}>
            <CIcon
              type="MaterialCommunity"
              color="rgba(0, 0, 0, 0.54);"
              size={32}
              name={isTracking ? "pause" : "map-marker-path"}
            />
          </CircleButton>
        </View>
        {isTracking && (
          <View style={{ position: "absolute", zIndex: 10, bottom: isTracking ? 94 : 20, right: 15 }}>
            <CircleButton backgroundColor="#30be76" containerStyle={{ padding: 17 }} onPress={onPressFinish}>
              <CIcon type="FontAwesome" color="#FFFFFF" size={26} name="flag-checkered" />
            </CircleButton>
          </View>
        )}
      </>
    );
  }
);

export default mapControls;
