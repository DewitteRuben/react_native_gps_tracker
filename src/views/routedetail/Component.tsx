import React, { useEffect, useState, useRef } from "react";
import { View, Animated } from "react-native";
import { CText as Text, CText, Spinner, Icon } from "../../components";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { RouteData } from "../../redux/store/types";
import { GLOBAL } from "../../styles/global";
import { prettyDistance, prettyDuration } from "../../utils/prettyText";
import MapboxGL, { Point } from "@react-native-mapbox-gl/maps";
import { routeToFeature } from "../map/Utils";
import * as GeoJSON from "@turf/helpers/lib/geojson";
// @ts-ignore
import center from "@turf/center";
import bbox from "@turf/bbox";
import styles from "../../components/Overlay/styles";

interface Props {
  routes: RouteData[];
  distanceUnit: string;
}

const useFilteredRoute = (routes: RouteData[], routeId: string) => {
  const [geoJSON, setGeoJSON] = useState<GeoJSON.Feature | null>(null);
  const [route, setRoute] = useState<RouteData | null>(null);
  const [middlePoint, setMiddlePoint] = useState<GeoJSON.Position | null>(null);

  useEffect(() => {
    const filteredRoutes = routes.filter(route => route.id && route.id === routeId);
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

const routeDetail: React.FC<Props> = ({ routes, distanceUnit }) => {
  const { navigate } = useNavigation();
  const routeId = useNavigationParam("routeId");
  const { route, geoJSON, middlePoint } = useFilteredRoute(routes, routeId);
  let cameraRef: MapboxGL.Camera | null = null;

  if (!route || !geoJSON) {
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

  const handleCameraRef = (ref: any) => {
    cameraRef = ref;
  };

  const onMapDidFinishLoading = () => {
    const boundingBox = bbox(geoJSON);
    const nwCoords = [boundingBox[0], boundingBox[1]];
    const swCoords = [boundingBox[2], boundingBox[3]];
    if (cameraRef) {
      cameraRef.fitBounds(nwCoords, swCoords, 70);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 35 }}>
        <View style={{ paddingVertical: 20 }}>
          <Text text="Back" onPress={() => navigate("Routes")} />
        </View>
        <Text text={title} bold variant="h2" />
        <View style={{ flex: 0, justifyContent: "space-between", flexDirection: "row", marginBottom: 10 }}>
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
            <Icon type="FontAwesome5" size={24} name="bus" />
            <Text text={method} />
          </View>
          <View style={{ flex: 0, width: 108, flexDirection: "row", justifyContent: "space-between" }}>
            <Icon type="FontAwesome5" size={24} name="route" />
            <Text text={prettyDistance(distance, distanceUnit)} />
          </View>
          <View style={{ flex: 0, width: 65, flexDirection: "row", justifyContent: "space-between" }}>
            <Icon type="Feather" size={24} name="clock" />
            <Text text={prettyDuration(duration)} />
          </View>
        </View>
      </View>
      <MapboxGL.MapView style={GLOBAL.LAYOUT.container} onDidFinishLoadingMap={onMapDidFinishLoading} animated={true}>
        <MapboxGL.Camera ref={handleCameraRef} zoomLevel={11} centerCoordinate={middlePoint} followUserMode="normal" />
        <MapboxGL.PointAnnotation title="Start" id="start" coordinate={startCoords}>
          <MapboxGL.Callout title={"Start"} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.PointAnnotation title="End" id="end" coordinate={endCoords}>
          <MapboxGL.Callout title={"End"} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.ShapeSource id="routeSource" shape={geoJSON}>
          <MapboxGL.LineLayer id="routeLine" style={{ lineWidth: 3, lineColor: "#F7455D" }} />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    </View>
  );
};

export default routeDetail;
