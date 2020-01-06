import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, CText, Spinner } from "../../components";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { RouteData } from "../../redux/store/types";

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
      <CText text={JSON.stringify(route)} style={{ marginBottom: 15 }} />
    </View>
  );
};
export default routeDetail;
