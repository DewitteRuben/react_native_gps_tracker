import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { didCoordsUpdate, routeToFeature, useLocationPermission } from "../../views/map/Utils";
import { fbUpdateLastCoords, fbUpdateCoords, fbClearRoute } from "../../services/firebase";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import { MapControls, Modal } from "..";
import { GLOBAL } from "../../styles/global";
import { useNavigation } from "react-navigation-hooks";
import { getModalButtons } from "../../utils/modal";
import { useTimer } from "../../utils/time";

let prevCoords = { longitude: 0, latitude: 0 };

export interface Props {
  onTrackUpdate?: (distance: MapboxGL.Coordinates[], duration: number) => void;
}

const trackingMap: React.FC<Props> = React.memo(({ onTrackUpdate }) => {
  const { navigate } = useNavigation();
  const hasPermission = useLocationPermission();

  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();

  const [isConcludeModalVisible, setConcludeModalVisibility] = useState(false);
  const [isSaveModalVisible, setSaveModalVisibility] = useState(false);

  const [followUser, setFollowUser] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [isTracking, setTracking] = useState(false);

  const timerCallback = (elapsedTime: number) => {
    if (onTrackUpdate) {
      onTrackUpdate(route, elapsedTime);
    }
  };

  const { elapsedTime, start, stop, pause, isActive } = useTimer(timerCallback);

  const onSaveModalClose = useCallback(() => {
    setSaveModalVisibility(false);
  }, []);

  const onConcludeModalClose = useCallback(() => {
    setConcludeModalVisibility(false);
  }, []);

  const toggleLive = useCallback(() => {
    setLiveUpdate(!liveUpdate);
  }, [liveUpdate]);

  const toggleTracking = () => {
    if (!isTracking) {
      start();
    } else {
      pause();
    }

    setTracking(!isTracking);
  };

  const onTrackFinish = () => {
    if (route.length) {
      if (isActive && isTracking) {
        pause();
        setTracking(false);
      }
      setConcludeModalVisibility(true);
    }
  };

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

    clearRoute();

    navigate("SaveRoute", {
      duration: elapsedTime,
      distance: { start: startingLatLong, end: endLatLong },
      route: currentRoute
    });
  }, [route, elapsedTime]);

  const clearRoute = useCallback(() => {
    setRoute([]);
    setGeoJsonFeature(routeToFeature([]));
    setTracking(false);
    stop();
    if (liveUpdate) {
      fbClearRoute();
    }
    setSaveModalVisibility(false);
  }, [liveUpdate]);

  const concludeModalButtons = useMemo(
    () =>
      getModalButtons(
        { label: "No", callback: () => setConcludeModalVisibility(false) },
        { label: "Yes", callback: onRouteConclude }
      ),
    [onRouteConclude]
  );

  const saveModalButtons = useMemo(
    () => getModalButtons({ label: "No", callback: clearRoute }, { label: "Yes", callback: onRouteSave }),
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
        hasTracked={!!route.length}
        onPressToggleLive={toggleLive}
        onPressTrack={toggleTracking}
        onPressFinish={onTrackFinish}
      />
      <Modal
        isVisible={isConcludeModalVisible}
        onSwipeComplete={onConcludeModalClose}
        swipeDirection="up"
        onBackdropPress={onConcludeModalClose}
        text="Do you wish to conclude the current route?"
        buttons={concludeModalButtons}
      />
      <Modal
        isVisible={isSaveModalVisible}
        swipeDirection="up"
        onBackdropPress={onSaveModalClose}
        text="Do you wish to save the route?"
        buttons={saveModalButtons}
      />
    </View>
  );
});

export default trackingMap;
