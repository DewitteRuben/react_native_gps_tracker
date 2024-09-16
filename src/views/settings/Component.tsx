import React, { useEffect, useState, useCallback } from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { View } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { isNumber } from "@turf/helpers";
import { GLOBAL } from "../../styles/global";
import { CText as Text, Dropdown, Checkbox, Input } from "../../components";
import { IUpdateDistanceUnitAction, IUpdateWebRTCStateAction } from "../../redux/actions/settings";
import { DropDownData } from "../../components/Dropdown/types";
import styles from "./styles";
import { SettingsState } from "../../redux/store/types";

interface NavigationBottomTabScreenComponent {
  navigationOptions?: NavigationScreenConfig<
    NavigationBottomTabOptions,
    NavigationTabProp<NavigationRoute, NavigationParams>,
    unknown
  >;
}

interface NavigationBottomTabScreenFC extends React.FC<Props>, NavigationBottomTabScreenComponent {}

interface Props {
  distanceUnit: string;
  trackingId: string;
  webRTC: boolean;
  defaultZoom: number;
  minDisplacement: number;
  updateDistanceUnit: (unit: string) => IUpdateDistanceUnitAction;
  updateWebRTCState: (webRTCState: boolean) => IUpdateWebRTCStateAction;
  updateSettingsState: ({
    defaultZoom,
    distanceUnit,
    minDisplacement,
    trackingId,
    webRTC
  }: Partial<SettingsState>) => any;
}

const Settings: NavigationBottomTabScreenFC = (props: Props) => {
  const {
    distanceUnit,
    updateDistanceUnit,
    trackingId,
    webRTC,
    updateWebRTCState,
    defaultZoom,
    updateSettingsState,
    minDisplacement
  } = props;

  const [zoom, setZoom] = useState(defaultZoom);
  const [displacement, setDisplacement] = useState(minDisplacement);
  const [webRTCState, setWebRTCState] = useState(webRTC);

  const handleDropdownChange = useCallback(
    (item: DropDownData | string) => {
      if (typeof item === "string") {
        updateDistanceUnit(item);
      } else {
        updateDistanceUnit(item.value);
      }
    },
    [updateDistanceUnit]
  );

  const handleToggleWebRTC = useCallback((checked: boolean) => {
    setWebRTCState(checked);
  }, []);

  const distanceUnitsData = React.useMemo(
    () => [
      { value: "km", label: "km" },
      { value: "miles", label: "miles" }
    ],
    []
  );

  const handleZoomInput = useCallback((value: string) => {
    const intValue = parseInt(value, 10);
    setZoom(isNumber(intValue) && intValue < 23 ? intValue : undefined);
  }, []);

  const handleDisplacementInput = useCallback((value: string) => {
    const intValue = parseInt(value, 10);
    setDisplacement(isNumber(intValue) && intValue >= 0 ? intValue : undefined);
  }, []);

  useEffect(() => {
    if (defaultZoom !== zoom || minDisplacement !== displacement || webRTCState !== webRTC) {
      updateSettingsState({ defaultZoom: zoom, minDisplacement: displacement, webRTC: webRTCState });
    }
  }, [zoom, displacement, updateSettingsState, defaultZoom, minDisplacement, webRTCState, webRTC]);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text text="Settings" bold variant="h2" />
        <Text text={`Tracking ID: ${trackingId}`} />
      </View>
      <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
        <View>
          <Input
            keyboardType="numeric"
            onChangeText={handleZoomInput}
            label="Default zoom (0-22)"
            value={zoom?.toString() || ""}
          />
          <Input
            keyboardType="numeric"
            onChangeText={handleDisplacementInput}
            label="Minimum displacement (m)"
            value={displacement?.toString() || ""}
          />
          <Dropdown
            label="Distance unit"
            onChangeText={handleDropdownChange}
            data={distanceUnitsData}
            defaultValue={distanceUnit}
          />
        </View>
        <View style={styles.otherContainer}>
          <Checkbox checked={webRTC} onPress={handleToggleWebRTC} label="Enable WebRTC [EXPERIMENTAL]" />
        </View>
      </View>
    </>
  );
};

Settings.navigationOptions = {
  tabBarIcon: ({ focused }: RenderIconProps) => (
    <Icon
      type={IconType.FontAwesome}
      name="cog"
      color={focused ? GLOBAL.MAIN.lighterWhite : GLOBAL.MAIN.green}
      size={23}
    />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default Settings;
