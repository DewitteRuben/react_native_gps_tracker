import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Modal, SaveRouteForm } from "../../components";
import { GLOBAL } from "../../styles/global";
import * as geometry from "spherical-geometry-js";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

const saveRoute: React.FC = () => {
  const { navigate } = useNavigation();
  const distance: { start: MapboxGL.Coordinates; end: MapboxGL.Coordinates } = useNavigationParam("distance");
  const duration: number = useNavigationParam("duration");

  const [isModalVisible, setModalVisibility] = useState(false);

  const distanceInMeters = useMemo(() => {
    const { latitude: startLat, longitude: startLong } = distance.start;
    const { latitude: endLat, longitude: endLong } = distance.end;
    return geometry.computeDistanceBetween([startLat, startLong], [endLat, endLong]);
  }, [distance]);

  useEffect(() => {
    setModalVisibility(true);
  }, []);

  const onModalClose = useCallback(() => {
    setModalVisibility(false);
    navigate("Map");
  }, []);

  const onRouteSave = useCallback(() => {
    setModalVisibility(false);
  }, []);

  const modalButtons = useMemo(
    () => [
      { onPress: onModalClose, text: "No", style: { width: "45%", paddingVertical: 15 } },
      {
        onPress: onRouteSave,
        text: "Yes",
        style: { width: "45%", paddingVertical: 15 }
      }
    ],
    []
  );

  return (
    <>
      <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
        <Text text="Save route" bold variant="h2" />
        <SaveRouteForm distance={distanceInMeters.toString()} duration={duration.toString()} />
      </View>
      <Modal
        isVisible={isModalVisible}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text="Do you wish to save the route?"
        buttons={modalButtons}
      />
    </>
  );
};
export default saveRoute;
