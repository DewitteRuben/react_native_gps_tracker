import React, { useEffect, useState, useRef, useCallback } from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { View, SafeAreaView } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { RenderIconProps } from "react-navigation-material-bottom-tabs/lib/typescript/src/navigators/createMaterialBottomTabNavigator";
import { NavigationScreenConfig, NavigationRoute, NavigationParams } from "react-navigation";
import { NavigationBottomTabOptions } from "react-navigation-tabs";
import { NavigationTabProp } from "react-navigation-material-bottom-tabs";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import moment from "moment";
import { RouteData } from "../../redux/store/types";
import { prettyDuration, metersToUnit } from "../../utils/units";
import { CText as Text, RouteItem, CText } from "../../components";
import styles from "./styles";
import { GLOBAL } from "../../styles/global";
import { ROUTES } from "../../navigators/navigation";

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

const emptyList = () => (
  <View>
    <Text text="No routes have been saved yet." />
  </View>
);

const Routes: NavigationBottomTabScreenFC = ({ routes, distanceUnit }) => {
  const { navigate } = useNavigation();

  const viewRoute = (routeId: string) => () => navigate(ROUTES.ROUTE_DETAIL, { routeId });

  return (
    <>
      <View style={styles.titleContainer}>
        <CText bold variant="h2" text="Saved Routes" />
      </View>
      <View style={GLOBAL.LAYOUT.container}>
        <FlatList
          ListEmptyComponent={emptyList}
          data={routes}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
          renderItem={({ item }) => {
            const { title, method, start, end, distance, duration, id, date } = item;
            const formattedDate = moment(date).format("LLL");

            return (
              <RouteItem
                onPress={viewRoute(id)}
                title={title}
                type={method}
                startPoint={start}
                endPoint={end}
                date={formattedDate}
                distance={`${metersToUnit(distance, distanceUnit)} ${distanceUnit}`}
                duration={prettyDuration(duration)}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

Routes.navigationOptions = {
  tabBarIcon: ({ focused }: RenderIconProps) => (
    <Icon
      type={IconType.FontAwesome5}
      name="route"
      color={focused ? GLOBAL.MAIN.lighterWhite : GLOBAL.MAIN.green}
      size={23}
    />
  )
} as Partial<
  NavigationScreenConfig<NavigationStackOptions, NavigationTabProp<NavigationRoute, NavigationParams>, unknown>
>;

export default Routes;
