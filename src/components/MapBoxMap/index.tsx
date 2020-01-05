import React, { useCallback, useState, useMemo } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { didCoordsUpdate, routeToFeature, useLocationPermission } from "../../views/map/Utils";
import { fbUpdateLastCoords, fbUpdateCoords, fbClearRoute } from "../../services/firebase";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import config from "../../config";
import { MapControls, Modal } from "..";
import { GLOBAL } from "../../styles/global";
import { useNavigation } from "react-navigation-hooks";
import PreciseElapsedTime from "../../utils/timer";

MapboxGL.setAccessToken(config.mapbox.accessToken);

let prevCoords = { longitude: 0, latitude: 0 };
const timer = new PreciseElapsedTime();

export interface Props {}

const MapboxMap: React.FC<Props> = React.memo(() => {
  const { navigate } = useNavigation();
  const hasPermission = useLocationPermission();

  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();

  const [isConcludeModalVisible, setConcludeModalVisibility] = useState(false);
  const [isSaveModalVisible, setSaveModalVisibility] = useState(false);

  const [followUser, setFollowUser] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [isTracking, setTracking] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const onModalClose = useCallback(() => {
    setConcludeModalVisibility(false);
  }, []);

  const toggleLive = useCallback(() => {
    setLiveUpdate(!liveUpdate);
  }, [liveUpdate]);

  const toggleTracking = useCallback(() => {
    if (!isTracking) {
      timer.start();
    } else {
      setElapsedTime(elapsedTime + timer.getElapsedTime());
      timer.stop();
    }

    setTracking(!isTracking);
  }, [isTracking]);

  const onTrackFinish = useCallback(() => {
    if (route.length) {
      setConcludeModalVisibility(true);
    }
  }, [route]);

  const onRouteConclude = useCallback(() => {
    setConcludeModalVisibility(false);
    setSaveModalVisibility(true);
  }, []);

  const onRouteSave = useCallback(() => {
    if (!route.length) {
      return;
    }

    const currentRoute = route.map(e => ({ ...e })); // deep copy

    const startingLatLong = currentRoute[0];
    const endLatLong = currentRoute[currentRoute.length - 1];

    if (!(startingLatLong && endLatLong)) {
      return;
    }

    const duration = timer.getElapsedTime();
    timer.stop();

    clearRoute();

    navigate("SaveRoute", { duration, distance: { start: startingLatLong, end: endLatLong }, route: currentRoute });
  }, [route]);

  const clearRoute = useCallback(() => {
    setRoute([]);
    setGeoJsonFeature(routeToFeature([]));
    setTracking(false);
    if (liveUpdate) {
      fbClearRoute();
    }
    setSaveModalVisibility(false);
  }, [liveUpdate]);

  const concludeModalButtons = useMemo(
    () => [
      { onPress: () => setConcludeModalVisibility(false), text: "No", style: { width: "45%", paddingVertical: 15 } },
      {
        onPress: onRouteConclude,
        text: "Yes",
        style: { width: "45%", paddingVertical: 15 }
      }
    ],
    [onRouteConclude]
  );

  const saveModalButtons = useMemo(
    () => [
      { onPress: clearRoute, text: "No", style: { width: "45%", paddingVertical: 15 } },
      {
        onPress: onRouteSave,
        text: "Yes",
        style: { width: "45%", paddingVertical: 15 }
      }
    ],
    [clearRoute, onRouteSave]
  );

  const onUserlocationUpdate = useCallback(
    (location: MapboxGL.Location) => {
      if (prevCoords.longitude === 0 && prevCoords.latitude === 0) {
        prevCoords = location.coords;
      }

      setFollowUser(true);
      if (didCoordsUpdate(prevCoords, location.coords)) {
        if (isTracking) {
          const newRoute = [...route, ...(route.length < 2 ? [prevCoords] : []), location.coords];
          if (liveUpdate) {
            fbUpdateLastCoords(location.coords);
            fbUpdateCoords(newRoute);
          }
          setRoute(newRoute);
          setTimeout(() => {
            setGeoJsonFeature(routeToFeature(newRoute));
          }, 1000);
        }

        prevCoords = location.coords;
      }
    },
    [isTracking, route, liveUpdate]
  );

  const handleTouchMove = useCallback(() => {
    setFollowUser(false);
  }, []);

  const hasTracked = useMemo(() => {
    return !!route.length;
  }, [route]);

  return (
    <View style={GLOBAL.LAYOUT.container}>
      <MapboxGL.MapView
        style={GLOBAL.LAYOUT.container}
        animated={true}
        onTouchMove={handleTouchMove}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
      >
        <MapboxGL.Camera zoomLevel={12} followZoomLevel={12} followUserLocation={followUser} followUserMode="normal" />
        {geojsonFeature && (
          <MapboxGL.ShapeSource id="routeSource" shape={geojsonFeature}>
            <MapboxGL.LineLayer id="routeLine" style={{ lineWidth: 3, lineColor: "#F7455D" }} />
          </MapboxGL.ShapeSource>
        )}

        <MapboxGL.UserLocation
          onUpdate={onUserlocationUpdate}
          visible={hasPermission}
          renderMode="normal"
          animated={true}
        />
      </MapboxGL.MapView>
      <MapControls
        isTracking={isTracking}
        liveUpdate={liveUpdate}
        hasTracked={hasTracked}
        onPressToggleLive={toggleLive}
        onPressTrack={toggleTracking}
        onPressFinish={onTrackFinish}
      />
      <Modal
        isVisible={isConcludeModalVisible}
        onSwipeComplete={onModalClose}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text="Do you wish to conclude the current route?"
        buttons={concludeModalButtons}
      />
      <Modal
        isVisible={isSaveModalVisible}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text="Do you wish to save the route?"
        buttons={saveModalButtons}
      />
    </View>
  );
});

export default MapboxMap;
