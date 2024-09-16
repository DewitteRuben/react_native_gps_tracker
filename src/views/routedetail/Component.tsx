import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import center from "@turf/center";
import bbox from "@turf/bbox";
import MapboxGL, { UserTrackingMode } from "@rnmapbox/maps";
import { ThunkAction } from "redux-thunk";
import { withNavigation } from "react-navigation";
import { routeToFeature } from "../map/Utils";
import { prettyDuration, metersToUnit } from "../../utils/units";
import { GLOBAL } from "../../styles/global";
import { RouteData, StoreState } from "../../redux/store/types";
import { CText as Text, CText, Spinner, Modal, BackArrowButton, LoadingOverlay } from "../../components";
import { typeToIconMap, TravelingMethod } from "../../utils/supportedTravelingMethods";
import { getModalButtons } from "../../utils/modal";
import styles from "./styles";
import { ROUTES } from "../../navigators/navigation";

interface Props {
  routes: RouteData[];
  distanceUnit: string;
  navigation: any;
  deleteRoute: (routeId: string) => ThunkAction<void, StoreState, undefined, any>;
}

const useFilteredRoute = (routes: RouteData[], routeId: string) => {
  const [geoJSON, setGeoJSON] = useState<GeoJSON.Feature<any> | null>(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [middlePoint, setMiddlePoint] = useState<GeoJSON.Position | null>(null);

  useEffect(() => {
    const filteredRoutes = routes.filter(filteredRoute => filteredRoute.id && filteredRoute.id === routeId);

    if (!filteredRoutes.length) {
      return;
    }

    const routeWithId = filteredRoutes[0];
    const geoJsonFeature = routeToFeature(routeWithId.coordinates);
    const centerGeoJson: GeoJSON.Feature<GeoJSON.Geometry> = center(geoJsonFeature);
    const point = centerGeoJson.geometry.coordinates as GeoJSON.Position;
    setRoute(routeWithId);
    setGeoJSON(geoJsonFeature);
    setMiddlePoint(point);
  }, [routeId, routes]);

  return { route, geoJSON, middlePoint };
};

const RouteDetail: React.FC<Props> = ({ routes, distanceUnit, deleteRoute, navigation }) => {
  const { navigate } = navigation;
  const routeId = useNavigationParam("routeId");
  const { route, geoJSON, middlePoint } = useFilteredRoute(routes, routeId);

  const [isModalVisible, setModalVisbility] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const onModalOpen = useCallback(() => setModalVisbility(true), []);
  const onModalClose = useCallback(() => setModalVisbility(false), []);
  const onDeleteRoute = useCallback(() => {
    deleteRoute(routeId);
    setDeleted(true);
  }, [deleteRoute, routeId]);

  const concludeModalButtons = useMemo(
    () => getModalButtons({ label: "No", callback: onModalClose }, { label: "Yes", callback: onDeleteRoute }),
    [onDeleteRoute, onModalClose]
  );

  const backHandler = useCallback(() => navigate(ROUTES.TAB_ROUTES), [navigate]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backHandler]);

  if (!route || !geoJSON || deleted) {
    if (deleted) {
      navigate(ROUTES.TAB_ROUTES);
    }

    return <LoadingOverlay />;
  }

  const { title, end, duration, method, distance, id, start, coordinates } = route;

  const startPoint = coordinates[0];
  const endPoint = coordinates[coordinates.length - 1];

  const startCoords = [startPoint.longitude, startPoint.latitude];
  const endCoords = [endPoint.longitude, endPoint.latitude];

  const handleCameraRef = (camera: MapboxGL.Camera) => {
    const boundingBox = bbox(geoJSON);
    const nwCoords = [boundingBox[0], boundingBox[1]];
    const swCoords = [boundingBox[2], boundingBox[3]];
    if (camera) {
      camera.fitBounds(nwCoords, swCoords, 70);
    }
  };

  const parsedIconName = typeToIconMap[method.toLowerCase() as TravelingMethod];

  return (
    <View style={GLOBAL.LAYOUT.container}>
      <View style={styles.mainContainer}>
        <View style={[styles.topContainer, GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween]}>
          <BackArrowButton onPress={backHandler} />
          <View style={[styles.actionsContainer, GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween]}>
            <TouchableOpacity onPress={() => navigate(ROUTES.EDIT_ROUTE, { routeId: id })}>
              <Icon name="pencil" size={21} type={IconType.FontAwesome} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onModalOpen}>
              <Icon name="trash" size={21} type={IconType.FontAwesome} />
            </TouchableOpacity>
          </View>
        </View>
        <Text text={title} bold variant="h2" />
        <View style={[styles.fromToContainer, GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween]}>
          <Text variant="h3" text={`From ${start}`} />
          <Text variant="h3" text={`To ${end}`} />
        </View>
        <View
          style={[GLOBAL.LAYOUT.shadow, GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween, styles.infoContainer]}
        >
          <View style={[GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween]}>
            <Icon style={styles.icon} type={IconType.FontAwesome5} size={24} name={parsedIconName} />
            <Text text={method} />
          </View>
          <View style={[GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween]}>
            <Icon style={styles.icon} type={IconType.FontAwesome5} size={24} name="route" />
            <Text text={`${metersToUnit(distance, distanceUnit)} ${distanceUnit}`} />
          </View>
          <View style={[GLOBAL.LAYOUT.flexRow, GLOBAL.LAYOUT.justifySpaceBetween]}>
            <Icon style={styles.icon} type={IconType.Feather} size={24} name="clock" />
            <Text text={prettyDuration(duration)} />
          </View>
        </View>
      </View>
      <MapboxGL.MapView style={GLOBAL.LAYOUT.container}>
        <MapboxGL.Camera
          ref={handleCameraRef}
          zoomLevel={11}
          centerCoordinate={middlePoint ?? undefined}
          followUserMode={UserTrackingMode.Follow}
        />
        <MapboxGL.PointAnnotation title="Start" id="start" coordinate={startCoords}>
          <MapboxGL.Callout title={start} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.PointAnnotation title="End" id="end" coordinate={endCoords}>
          <MapboxGL.Callout title={end} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.ShapeSource id="routeSource" shape={geoJSON}>
          <MapboxGL.LineLayer id="routeLine" style={GLOBAL.MAP.line} />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        onBackdropPress={onModalClose}
        text="Do you really wish to delete the current route?"
        buttons={concludeModalButtons}
      />
    </View>
  );
};

export default withNavigation(RouteDetail);
