import React, { useState, useEffect } from "react";
import { SaveRouteForm, CText as Text, Spinner, BackArrowButton } from "../../components";
import { View, BackHandler } from "react-native";
import { GLOBAL } from "../../styles/global";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { RouteData, StoreState } from "../../redux/store/types";
import { ThunkAction } from "redux-thunk";
import { ISaveRouteForm } from "../../components/SaveRouteForm";

interface Props {
  getRoutesById: (id: string) => RouteData;
  updateRoute: (routeData: RouteData) => ThunkAction<void, StoreState, undefined, any>;
}

const editRoute: React.FC<Props> = ({ getRoutesById, updateRoute }) => {
  const { navigate } = useNavigation();
  const routeId = useNavigationParam("routeId");
  const [updatedRoute, setUpdatedRoute] = useState<RouteData>();

  if (!routeId) {
    navigate("Routes");

    return (
      <View style={{ flex: 0, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }

  const route = getRoutesById(routeId);
  const { duration, distance, start, title, end, method, coordinates, id } = route;
  const backHandler = () => navigate("RouteDetail", { routeId: id });

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, []);

  const handleSaveRoute = (routeDetails: ISaveRouteForm) => {
    setUpdatedRoute({ ...routeDetails, coordinates, id } as RouteData);
  };

  if (updatedRoute) {
    updateRoute(updatedRoute);
    navigate("RouteDetail", { routeId: id });
  }

  return (
    <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
      <View style={{ paddingVertical: 20 }}>
        <BackArrowButton onPress={backHandler} />
      </View>
      <Text text="Edit route" bold variant="h2" />
      <SaveRouteForm
        onSubmit={handleSaveRoute}
        duration={duration}
        distance={distance}
        start={start}
        title={title}
        end={end}
        method={method}
      />
    </View>
  );
};

export default editRoute;
