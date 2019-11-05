import React, { useCallback, useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  didCoordsUpdate,
  routeToFeature,
  useLocationPermission,
} from "../../views/map/Utils";
import { fbTest } from "../../services/firebase";
import * as GeoJSON from "@turf/helpers/lib/geojson";
import config from "../../config";

MapboxGL.setAccessToken(config.mapbox.accessToken);

let prevCoords = { longitude: 0, latitude: 0 };

export interface Props {
  tracking?: boolean;
}

const MapboxMap: React.FC<Props> = ({ tracking }) => {
  const hasPermission = useLocationPermission();
  const [followUser, setFollowUser] = useState(false);
  const [route, setRoute] = useState<MapboxGL.Coordinates[]>([]);
  const [geojsonFeature, setGeoJsonFeature] = useState<GeoJSON.Feature>();

  const onUserlocationUpdate = useCallback(
    (location: MapboxGL.Location) => {
      if (prevCoords.longitude === 0 && prevCoords.latitude === 0) {
        prevCoords = location.coords;
      }

      if (didCoordsUpdate(prevCoords, location.coords)) {
        setFollowUser(true);
        if (tracking) {
          const newRoute = [...route, location.coords];
          fbTest(location.coords);
          setRoute(newRoute);
          setGeoJsonFeature(routeToFeature(newRoute));
        }

        prevCoords = location.coords;
      }
    },
    [tracking, route],
  );

  return (
    <MapboxGL.MapView
      style={{ flex: 1 }}
      animated={true}
      onTouchMove={() => setFollowUser(false)}
      userTrackingMode={MapboxGL.UserTrackingModes.Follow}>
      <MapboxGL.Camera
        zoomLevel={12}
        followZoomLevel={12}
        followUserLocation={followUser}
        followUserMode="normal"
      />
      {geojsonFeature && (
        <MapboxGL.ShapeSource id="routeSource" shape={geojsonFeature}>
          <MapboxGL.LineLayer
            id="routeLine"
            style={{ lineWidth: 3, lineColor: "#F7455D" }}></MapboxGL.LineLayer>
        </MapboxGL.ShapeSource>
      )}

      <MapboxGL.UserLocation
        onUpdate={onUserlocationUpdate}
        visible={hasPermission}
        renderMode="normal"
        animated={true}
      />
    </MapboxGL.MapView>
  );
};

export default MapboxMap;
