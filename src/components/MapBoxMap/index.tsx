import React, { useCallback, useState, useEffect } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { didCoordsUpdate, routeToFeature, useLocationPermission } from "../../views/map/Utils";
import { fbUpdateLastCoords, fbUpdateCoords } from "../../services/firebase";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import config from "../../config";
import { CircleButton, Icon as CIcon, MapControls } from "..";

MapboxGL.setAccessToken(config.mapbox.accessToken);

let prevCoords = { longitude: 0, latitude: 0 };

export interface Props {
  style?: StyleProp<ViewStyle>;
}

const MapboxMap: React.FC<Props> = ({ style }) => {
  const hasPermission = useLocationPermission();
  const [followUser, setFollowUser] = useState(false);
  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [isTracking, setTracking] = useState(false);

  const onUserlocationUpdate = useCallback(
    (location: MapboxGL.Location) => {
      if (prevCoords.longitude === 0 && prevCoords.latitude === 0) {
        prevCoords = location.coords;
      }

      setFollowUser(true);
      if (didCoordsUpdate(prevCoords, location.coords)) {
        if (isTracking) {
          const newRoute = [...route, location.coords];
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

  return (
    <View style={[style, { flex: 1 }]}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        animated={true}
        onTouchMove={() => setFollowUser(false)}
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
        onPressToggleLive={() => setLiveUpdate(!liveUpdate)}
        onPressTrack={() => setTracking(!isTracking)}
        onPressFinish={() => console.log("test")}
      />
    </View>
  );
};

export default MapboxMap;
