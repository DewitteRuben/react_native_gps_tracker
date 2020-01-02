import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CText as Text, Icon, Dropdown } from "../../components";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { GLOBAL } from "../../styles/global";
import getUUID from "../../utils/uuid";

const useUUID = () => {
  const [uuid, setUUID] = useState();

  useEffect(() => {
    async function requestUUID() {
      try {
        const id = await getUUID();
        setUUID(id);
      } catch (error) {
        setUUID(null);
      }
    }

    requestUUID();
  }, []);

  return [uuid];
};

const settings: NavigationBottomTabScreenComponent = () => {
  const [uuid] = useUUID();

  return (
    <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
      <Text text="Settings" bold variant="h2" />
      <Text text={`Tracking ID: ${uuid}`} />
      <Dropdown
        label={"Distance unit"}
        data={[
          { value: "km", label: "km" },
          { value: "mile", label: "mile" }
        ]}
        defaultValue="km"
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
