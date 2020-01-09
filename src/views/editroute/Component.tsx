import React from "react";
import { SaveRouteForm, CText as Text, Spinner } from "../../components";
import { View } from "react-native";
import { GLOBAL } from "../../styles/global";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { RouteData } from "../../redux/store/types";

interface Props {
  getRoutesById: (id: string) => RouteData;
}

const editRoute: React.FC<Props> = ({ getRoutesById }) => {
  const { navigate } = useNavigation();
  const routeId = useNavigationParam("routeId");

  if (!routeId) {
    navigate("Routes");

    return (
      <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }

  const route = getRoutesById(routeId);
  const { duration, distance, start, title, end, method } = route;

  return (
    <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
      <Text text="Edit route" bold variant="h2" />
      <SaveRouteForm duration={duration} distance={distance} start={start} title={title} end={end} method={method} />
    </View>
  );
};

export default editRoute;
