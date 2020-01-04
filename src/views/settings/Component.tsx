import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Icon, Dropdown } from "../../components";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { GLOBAL } from "../../styles/global";
import { DropDownData } from "react-native-material-dropdown";
import { IUpdateDistanceUnitAction } from "../../redux/actions/settings";

interface NavigationBottomTabScreenComponent {
  navigationOptions?: NavigationScreenConfig<
    NavigationBottomTabOptions,
    NavigationTabProp<NavigationRoute, NavigationParams>,
    unknown
  >;
}

interface NavigationBottomTabScreenFunctionalComponent extends React.FC<Props>, NavigationBottomTabScreenComponent {}

interface Props {
  distanceUnit: string;
  trackingId: string;
  updateDistanceUnit: (unit: string) => IUpdateDistanceUnitAction;
}

const settings: NavigationBottomTabScreenFunctionalComponent = (props: Props) => {
  const { distanceUnit, updateDistanceUnit, trackingId } = props;

  const handleDropdownChange = useCallback((item: DropDownData, itemIndex: number) => {
    updateDistanceUnit(item.value);
  }, []);

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
        label={"Distance unit"}
        onChangeText={handleDropdownChange}
        data={distanceUnitsData}
        defaultValue={distanceUnit}
      />
    </View>
  );
};

settings.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }: RenderIconProps) => (
    <Icon type="FontAwesome" name="cog" color={focused ? "#ffffff" : "#30be76"} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default settings;
