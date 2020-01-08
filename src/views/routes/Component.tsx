import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, SafeAreaView } from "react-native";
import { CText as Text, Icon, RouteItem, CText } from "../../components";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { FlatList } from "react-native-gesture-handler";
import { RouteData } from "../../redux/store/types";
import { useNavigation } from "react-navigation-hooks";
import { prettyDistance, prettyDuration } from "../../utils/prettyText";
import moment from "moment";

interface Props {
  routes: RouteData[];
  distanceUnit: string;
}

interface NavigationBottomTabScreenComponent {
  navigationOptions?: NavigationScreenConfig<
    NavigationBottomTabOptions,
    NavigationTabProp<NavigationRoute, NavigationParams>,
    unknown
  >;
}

interface NavigationBottomTabScreenFC extends React.FC<Props>, NavigationBottomTabScreenComponent {}

const routes: NavigationBottomTabScreenFC = ({ routes, distanceUnit }) => {
  const { navigate } = useNavigation();

  const viewRoute = (routeId: string) => () => navigate("RouteDetail", { routeId });

  return (
    <>
      <View style={{ paddingHorizontal: 20 }}>
        <CText bold variant="h2" text="Saved Routes" style={{ marginBottom: 15 }} />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={routes}
          contentContainerStyle={{ padding: 20 }}
          ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          renderItem={({ item }) => {
            const { title, method, start, end, distance, duration, id, date } = item;
            return (
              <RouteItem
                onPress={viewRoute(id!)}
                title={title}
                type="bus"
                startPoint={start}
                endPoint={end}
                date={moment(date!).format("LLL")}
                distance={prettyDistance(distance, distanceUnit)}
                duration={prettyDuration(duration)}
              />
            );
          }}
          keyExtractor={item => item.id!}
        />
      </View>
    </>
  );
};

routes.navigationOptions = {
  tabBarIcon: ({ focused, horizontal, tintColor }: RenderIconProps) => (
    <Icon type="FontAwesome5" name="route" color={focused ? "#ffffff" : "#30be76"} size={23} />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default routes;
