import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { CText as Text, CText, Spinner, Icon, Modal, BackArrowButton } from "../../components";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { RouteData, StoreState } from "../../redux/store/types";
import { GLOBAL } from "../../styles/global";
import { prettyDistance, prettyDuration } from "../../utils/units";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { routeToFeature } from "../map/Utils";
import * as GeoJSON from "@turf/helpers/lib/geojson";

// @ts-ignore
import center from "@turf/center";
import bbox from "@turf/bbox";
import { ThunkAction } from "redux-thunk";
import { withNavigation } from "react-navigation";
import { typeToIconMap, TravelingMethod } from "../../utils/supportedTravelingMethods";

interface Props {
  routes: RouteData[];
  distanceUnit: string;
  navigation: any;
  deleteRoute: (routeId: string) => ThunkAction<void, StoreState, undefined, any>;
}

const useFilteredRoute = (routes: RouteData[], routeId: string) => {
  const [geoJSON, setGeoJSON] = useState<GeoJSON.Feature | null>(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [middlePoint, setMiddlePoint] = useState<GeoJSON.Position | null>(null);

  useEffect(() => {
    const filteredRoutes = routes.filter(route => route.id && route.id === routeId);

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
  }, [routes]);

  return { route, geoJSON, middlePoint };
};

const routeDetail: React.FC<Props> = ({ routes, distanceUnit, deleteRoute, navigation }) => {
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
  }, [routeId]);

  const concludeModalButtons = useMemo(
    () => [
      { onPress: onModalClose, text: "No", style: { width: "45%", paddingVertical: 15 } },
      {
        onPress: onDeleteRoute,
        text: "Yes",
        style: { width: "45%", paddingVertical: 15 }
      }
    ],
    [routeId]
  );

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => navigate("Routes"));

    return BackHandler.removeEventListener("hardwareBackPress", () => navigate("Routes"));
  }, []);

  if (!route || !geoJSON || deleted) {
    if (deleted) {
      navigate("Routes");
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </View>
    );
  }

  const { title, end, duration, method, distance, date, id, start, coordinates } = route;

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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 35 }}>
        <View style={{ paddingVertical: 20, flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
          <BackArrowButton onPress={() => navigate("Routes")} />
          <TouchableOpacity onPress={onModalOpen}>
            <Icon name="trash" size={21} type="FontAwesome" />
          </TouchableOpacity>
        </View>
        <Text text={title} bold variant="h2" />
        <View style={{ flex: 0, justifyContent: "space-between", flexDirection: "row", marginVertical: 10 }}>
          <Text variant="h3" text={`From ${start}`} />
          <Text variant="h3" text={`To ${end}`} />
        </View>
        <View
          style={[
            GLOBAL.LAYOUT.shadow,
            {
              padding: 15,
              marginBottom: 35,
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between"
            }
          ]}
        >
          <View style={{ flex: 0, width: 60, flexDirection: "row", justifyContent: "space-between" }}>
            <Icon type="FontAwesome5" size={24} name={typeToIconMap[method.toLowerCase() as TravelingMethod]} />
            <Text text={method} />
          </View>
          <View style={{ flex: 0, width: 108, flexDirection: "row", justifyContent: "space-between" }}>
            <Icon type="FontAwesome5" size={24} name="route" />
            <Text text={prettyDistance(distance, distanceUnit)} />
          </View>
          <View style={{ flex: 0, width: 70, flexDirection: "row", justifyContent: "space-between" }}>
            <Icon type="Feather" size={24} name="clock" />
            <Text text={prettyDuration(duration)} />
          </View>
        </View>
      </View>
      <MapboxGL.MapView style={GLOBAL.LAYOUT.container} animated={true}>
        <MapboxGL.Camera ref={handleCameraRef} zoomLevel={11} centerCoordinate={middlePoint} followUserMode="normal" />
        <MapboxGL.PointAnnotation title="Start" id="start" coordinate={startCoords}>
          <MapboxGL.Callout title={start} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.PointAnnotation title="End" id="end" coordinate={endCoords}>
          <MapboxGL.Callout title={end} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.ShapeSource id="routeSource" shape={geoJSON}>
          <MapboxGL.LineLayer id="routeLine" style={{ lineWidth: 3, lineColor: "#F7455D" }} />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text="Do you really wish to delete the current route?"
        buttons={concludeModalButtons}
      />
    </View>
  );
};

export default withNavigation(routeDetail);
