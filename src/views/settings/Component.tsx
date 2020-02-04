import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { GLOBAL } from "../../styles/global";
import { CText as Text, Icon, Dropdown, Checkbox } from "../../components";
import { IUpdateDistanceUnitAction, IUpdateWebRTCStateAction } from "../../redux/actions/settings";
import { DropDownData } from "../../components/Dropdown/types";

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
  updateDistanceUnit: (unit: string) => IUpdateDistanceUnitAction;
  updateWebRTCState: (webRTCState: boolean) => IUpdateWebRTCStateAction;
}

const Settings: NavigationBottomTabScreenFC = (props: Props) => {
  const { distanceUnit, updateDistanceUnit, trackingId, webRTC } = props;

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

  const distanceUnitsData = React.useMemo(
    () => [
      { value: "km", label: "km" },
      { value: "miles", label: "miles" }
    ],
    []
  );

  return (
    <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
      <Text text="Settings" bold variant="h2" />
      <Text text={`Tracking ID: ${trackingId}`} />
      <Dropdown
        label="Distance unit"
        onChangeText={handleDropdownChange}
        data={distanceUnitsData}
        defaultValue={distanceUnit}
      />
      <Checkbox checked={webRTC} label="Enable WebRTC [EXPERIMENTAL]" />
    </View>
  );
};

Settings.navigationOptions = {
  tabBarIcon: ({ focused }: RenderIconProps) => (
    <Icon type="FontAwesome" name="cog" color={focused ? GLOBAL.MAIN.lighterWhite : GLOBAL.MAIN.green} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default Settings;
