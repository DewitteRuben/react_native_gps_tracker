import React, { useMemo, useState, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, SaveRouteForm, Modal } from "../../components";
import { GLOBAL } from "../../styles/global";
import * as geometry from "spherical-geometry-js";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { metersToMiles, metersToKilometers } from "../../utils/units";

export interface RouteDetails {
  title?: string;
  distance?: string;
  duration?: string;
  method?: string;
  start?: string;
  end?: string;
  [key: string]: string | undefined;
}

interface Props {
  distanceUnit: string;
}

const formKeyToPrettyName: { [key: string]: string } = {
  start: "Startpoint name",
  end: "Endpoint name",
  method: "Method",
  title: "Trip title"
};

const saveRoute: React.FC<Props> = ({ distanceUnit }) => {
  const { navigate } = useNavigation();

  const distance: { start: MapboxGL.Coordinates; end: MapboxGL.Coordinates } = useNavigationParam("distance");
  const duration: number = useNavigationParam("duration");

  const [isModalVisible, setModalVisibility] = useState(false);
  const [modalValidationMessage, setModalValidationMessage] = useState("");

  const distanceInMeters = useMemo(() => {
    const { latitude: startLat, longitude: startLong } = distance.start;
    const { latitude: endLat, longitude: endLong } = distance.end;
    return geometry.computeDistanceBetween([startLat, startLong], [endLat, endLong]);
  }, [distance]);

  const onModalClose = useCallback(() => setModalVisibility(false), []);

  const modalButtons = useMemo(
    () => [{ onPress: onModalClose, text: "Ok", style: { width: "100%", paddingVertical: 15 } }],
    []
  );

  const computeErrorMessages = (routeDetails: RouteDetails) =>
    Object.entries(routeDetails).reduce((acc, cur) => {
      const curKey = cur[0];
      const curVal = cur[1];

      if (!curVal) {
        acc.push(formKeyToPrettyName[curKey]);
      }

      return acc;
    }, [] as string[]);

  const onRouteSave = (routeDetails: RouteDetails) => {
    const errorMessages = computeErrorMessages(routeDetails);
    if (!errorMessages.length) {
      // save route
      navigate("Routes"); // navigate to the specified route
    }
    const missingFields = errorMessages.join(", ");
    setModalValidationMessage(`The following fields are not filled in: ${missingFields}.`);
    setModalVisibility(true);
  };

  return (
    <>
      <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.containerPadding]}>
        <Text text="Save route" bold variant="h2" />
        <SaveRouteForm distance={distanceInMeters.toString()} onSubmit={onRouteSave} duration={duration.toString()} />
      </View>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text={modalValidationMessage}
        buttons={modalButtons}
      />
    </>
  );
};
export default saveRoute;
