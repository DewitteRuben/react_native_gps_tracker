import React, { useCallback, useState, useMemo, memo, useEffect } from "react";
import { View, InteractionManager } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import { useNavigation } from "react-navigation-hooks";
import { didCoordsUpdate, routeToFeature, useLocationPermission } from "../../views/map/Utils";
import { fbUpdateLastCoords, fbUpdateCoords, fbClearRoute } from "../../services/firebase";
import { MapOverlay, Modal, TrackingFAB, LocationFAB, WifiButton } from "..";
import { getModalButtons } from "../../utils/modal";
import { GLOBAL } from "../../styles/global";
import { PreciseTimer } from "../../utils/time";
import { computeRouteDistance } from "../../utils/units";
import { ROUTES } from "../../navigators/navigation";

let prevCoords = { longitude: 0, latitude: 0 };

export interface Props {
  onTimerUpdate?: (duration: number) => void;
  onRouteUpdate?: (route: MapboxGL.Coordinates[], distance: number) => void;
  onTrackToggle?: (tracking: boolean) => void;
}

const preciseTimer = new PreciseTimer();

const TrackingMap: React.FC<Props> = memo(({ onTimerUpdate, onRouteUpdate, onTrackToggle }) => {
  const { navigate } = useNavigation();
  const hasPermission = useLocationPermission();

  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();
  const [computedDistance, setComputedDistance] = useState(0);

  const [isConcludeModalVisible, setConcludeModalVisibility] = useState(false);
  const [isSaveModalVisible, setSaveModalVisibility] = useState(false);

  const [followUser, setFollowUser] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [isTracking, setTracking] = useState(false);
  const [minDisplacement, setMinDisplacement] = useState(0);

  const [lastPosition, setLastPosition] = useState<MapboxGL.Coordinates>();
  const [camera, setCamera] = useState<MapboxGL.Camera>();

  useEffect(() => {
    onTrackToggle(isTracking);
  }, [isTracking, onTrackToggle]);

  const timerCallback = useCallback(
    (elapsedTime: number) => {
      if (onTimerUpdate) {
        onTimerUpdate(elapsedTime);
      }
    },
    [onTimerUpdate]
  );

  const onSaveModalClose = useCallback(() => {
    setSaveModalVisibility(false);
  }, []);

  const onConcludeModalClose = useCallback(() => {
    setConcludeModalVisibility(false);
  }, []);

  const toggleLive = useCallback(() => {
    setLiveUpdate(!liveUpdate);
  }, [liveUpdate]);

  const toggleTracking = useCallback(() => {
    if (!isTracking) {
      preciseTimer.start(timerCallback);
    } else {
      preciseTimer.pause();
    }

    setTracking(!isTracking);
  }, [isTracking, timerCallback]);

  const onTrackFinish = useCallback(() => {
    if (route.length) {
      if (preciseTimer.isActive && isTracking) {
        preciseTimer.pause();
        setTracking(false);
      }
      setConcludeModalVisibility(true);
    }
  }, [isTracking, route.length]);

  const onRouteConclude = useCallback(() => {
    setConcludeModalVisibility(false);
    setSaveModalVisibility(true);
  }, []);

  const clearRoute = useCallback(() => {
    setRoute([]);
    setGeoJsonFeature(routeToFeature([]));
    setTracking(false);
    preciseTimer.stop();
    if (liveUpdate) {
      fbClearRoute();
    }
    setSaveModalVisibility(false);
  }, [liveUpdate]);

  const onRouteSave = useCallback(() => {
    if (!route.length) {
      return;
    }

    const currentRoute = route.map(e => ({ ...e })); // deep copy
    const elapsedTime = preciseTimer.getElapsedTime();

    clearRoute();

    navigate(ROUTES.SAVE_ROUTE, {
      duration: elapsedTime,
      distance: computedDistance,
      route: currentRoute
    });
  }, [route, clearRoute, navigate, computedDistance]);

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

  useEffect(() => {
    if (camera && followUser && lastPosition) {
      const { longitude, latitude } = lastPosition;
      camera.moveTo([longitude, latitude], 1000);
    }
  }, [followUser, camera, lastPosition]);

  const onUserlocationUpdate = useCallback(
    (location: MapboxGL.Location) => {
      if (prevCoords.longitude === 0 && prevCoords.latitude === 0) {
        prevCoords = location.coords;
      }

      setLastPosition(location.coords);
      if (didCoordsUpdate(prevCoords, location.coords)) {
        if (liveUpdate) {
          fbUpdateLastCoords(location.coords);
        }

        if (isTracking) {
          const newRoute = [...route, ...(route.length < 2 ? [prevCoords] : []), location.coords];
          setRoute(newRoute);

          const geoJSONFeature = routeToFeature(newRoute);

          setTimeout(() => {
            setGeoJsonFeature(geoJSONFeature);
          }, 1000);

          const distance = computeRouteDistance(newRoute) || computedDistance;
          onRouteUpdate(newRoute, distance);
          setComputedDistance(distance);

          if (liveUpdate) {
            fbUpdateCoords(newRoute);
          }
        }

        prevCoords = location.coords;
      }
    },
    [isTracking, route, liveUpdate, onRouteUpdate, computedDistance]
  );

  const toggleFollowUser = useCallback(() => {
    setFollowUser(follow => !follow);
  }, []);

  const onDidFinishRenderingMapFully = useCallback(() => {
    setMinDisplacement(5);
  }, []);

  const routeLength = useMemo(() => {
    return !!route.length;
  }, [route]);

  const handleCameraRef = useCallback((ref: MapboxGL.Camera) => {
    setCamera(ref);
  }, []);

  const onTouchMove = useCallback(() => {
    if (followUser) {
      setFollowUser(false);
    }
  }, [followUser]);

  return (
    <>
      <View style={GLOBAL.LAYOUT.container}>
        <MapboxGL.MapView
          style={GLOBAL.LAYOUT.container}
          onTouchMove={onTouchMove}
          onDidFinishRenderingMapFully={onDidFinishRenderingMapFully}
          animated
        >
          <MapboxGL.Camera
            followUserMode="normal"
            followUserLocation={false}
            ref={handleCameraRef}
            zoomLevel={12}
            followZoomLevel={12}
          />
          {geojsonFeature && (
            <MapboxGL.ShapeSource id="routeSource" shape={geojsonFeature}>
              <MapboxGL.LineLayer id="routeLine" style={GLOBAL.MAP.line} />
            </MapboxGL.ShapeSource>
          )}
          <MapboxGL.UserLocation
            minDisplacement={minDisplacement}
            onUpdate={onUserlocationUpdate}
            visible={hasPermission}
            renderMode="normal"
            animated
          />
        </MapboxGL.MapView>
        <WifiButton onToggleLive={toggleLive} liveUpdate={liveUpdate} />
        <MapOverlay>
          <LocationFAB isFollowing={followUser} onPress={toggleFollowUser} />
          <TrackingFAB
            onToggleTracking={toggleTracking}
            onTrackFinish={onTrackFinish}
            isTracking={isTracking}
            hasTracked={routeLength}
          />
        </MapOverlay>
      </View>
      <Modal
        isVisible={isConcludeModalVisible}
        onSwipeComplete={onConcludeModalClose}
        onBackdropPress={onConcludeModalClose}
        text="Do you wish to conclude the current route?"
        buttons={concludeModalButtons}
      />
      <Modal
        isVisible={isSaveModalVisible}
        onBackdropPress={onSaveModalClose}
        text="Do you wish to save the route?"
        buttons={saveModalButtons}
      />
    </>
  );
});

export default TrackingMap;
