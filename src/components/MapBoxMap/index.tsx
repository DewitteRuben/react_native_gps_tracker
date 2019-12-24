import React, { useCallback, useState, useMemo } from "react";
import { View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { didCoordsUpdate, routeToFeature, useLocationPermission } from "../../views/map/Utils";
import { fbUpdateLastCoords, fbUpdateCoords, fbClearRoute } from "../../services/firebase";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import config from "../../config";
import { MapControls, Modal } from "..";
import { GLOBAL } from "../../styles/global";

MapboxGL.setAccessToken(config.mapbox.accessToken);

let prevCoords = { longitude: 0, latitude: 0 };

export interface Props {}

const MapboxMap: React.FC<Props> = React.memo(() => {
  const hasPermission = useLocationPermission();
  const [followUser, setFollowUser] = useState(false);
  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [isTracking, setTracking] = useState(false);
  const [isModalVisible, setModalVisbility] = useState(false);

  const onModalClose = useCallback(() => {
    setModalVisbility(false);
  }, []);

  const toggleLive = useCallback(() => {
    setLiveUpdate(!liveUpdate);
  }, [liveUpdate]);

  const toggleTracking = useCallback(() => {
    setTracking(!isTracking);
  }, [isTracking]);

  const onTrackFinish = useCallback(() => {
    setModalVisbility(true);
  }, []);

  const onTrackSave = useCallback(() => {
    setModalVisbility(false);
    clearRoute();
  }, []);

  const clearRoute = useCallback(() => {
    setRoute([]);
    setGeoJsonFeature(routeToFeature([]));
    setTracking(false);
    if (liveUpdate) {
      fbClearRoute();
    }
  }, [liveUpdate]);

  const modalButtons = useMemo(
    () => [
      { onPress: onModalClose, text: "No", style: { width: "45%", paddingVertical: 15 } },
      {
        onPress: onTrackSave,
        text: "Yes",
        style: { width: "45%", paddingVertical: 15 }
      }
    ],
    []
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
        onPressToggleLive={toggleLive}
        onPressTrack={toggleTracking}
        onPressFinish={onTrackFinish}
      />
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text="Do you wish to conclude your current track?"
        buttons={modalButtons}
      />
    </View>
  );
});

export default MapboxMap;
