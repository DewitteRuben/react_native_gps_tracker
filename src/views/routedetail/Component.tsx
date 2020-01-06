import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, CText, Spinner, Icon } from "../../components";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { RouteData } from "../../redux/store/types";
import { GLOBAL } from "../../styles/global";

interface Props {
  routes: RouteData[];
}

const routeDetail: React.FC<Props> = ({ routes }) => {
  const { navigate } = useNavigation();
  const routeId = useNavigationParam("routeId");
  const [route, setRoute] = useState<RouteData | null>(null);

  useEffect(() => {
    if (!routeId) {
      navigate("Routes");
      return;
    }
  }, [routeId]);

  useEffect(() => {
    const filteredRoutes = routes.filter(route => route.id && route.id === routeId);
    if (!filteredRoutes.length) {
      navigate("Routes");
      return;
    }

    const routeWithId = filteredRoutes[0];
    setRoute(routeWithId);
  }, [routes, routeId]);

  if (!route) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text text="Back" />
      </View>
      <Text text={route.title} bold variant="h2" />
      <View style={{ flex: 0, justifyContent: "space-between" }}>
        <Text text={`From ${route.start}`} />
        <Text text={`To ${route.end}`} />
      </View>
      <View
        style={[
          GLOBAL.LAYOUT.shadow,
          {
            paddingVertical: 12,
            paddingLeft: 5,
            paddingRight: 15,
            marginBottom: 35,
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-between"
          }
        ]}
      >
        <View>
          <Text text="PL" />
          <Text text={route.method} />
        </View>
        <View>
          <Icon type="FontAwesome5" size={24} name="route" />
          <Text text={route.distance} />
        </View>
        <View>
          <Icon type="Feather" size={24} name="clock" />
          <Text text={route.duration} />
        </View>
      </View>
    </View>
  );
};
export default routeDetail;
