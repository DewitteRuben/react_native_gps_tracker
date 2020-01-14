import React, { useState, useEffect, useCallback } from "react";
import { View, BackHandler } from "react-native";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { ThunkAction } from "redux-thunk";
import { SaveRouteForm, CText as Text, Spinner, BackArrowButton, LoadingOverlay } from "../../components";
import { GLOBAL } from "../../styles/global";
import { RouteData, StoreState } from "../../redux/store/types";
import { ISaveRouteForm } from "../../components/SaveRouteForm";
import styles from "./styles";
import { ROUTES } from "../../navigators/navigation";

interface Props {
  getRoutesById: (id: string) => RouteData;
  updateRoute: (routeData: RouteData) => ThunkAction<void, StoreState, undefined, any>;
}

const EditRoute: React.FC<Props> = ({ getRoutesById, updateRoute }) => {
  const { navigate } = useNavigation();
  const routeId = useNavigationParam("routeId");
  const [updatedRoute, setUpdatedRoute] = useState<RouteData>();

  const backHandler = useCallback(() => navigate(ROUTES.ROUTE_DETAIL, { routeId }), [navigate, routeId]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backHandler]);

  if (!routeId) {
    navigate(ROUTES.TAB_ROUTES);
    return <LoadingOverlay />;
  }

  const route = getRoutesById(routeId);
  const { duration, distance, start, title, end, method, coordinates, id } = route;

  const handleSaveRoute = (routeDetails: ISaveRouteForm) => {
    setUpdatedRoute({ ...routeDetails, coordinates, id } as RouteData);
  };

  if (updatedRoute) {
    updateRoute(updatedRoute);
    navigate(ROUTES.ROUTE_DETAIL, { routeId: id });
    return <LoadingOverlay />;
  }

  return (
    <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
      <View style={styles.backArrowContainer}>
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

export default EditRoute;
