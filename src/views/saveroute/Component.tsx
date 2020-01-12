import React, { useMemo, useState, useCallback, Dispatch, useEffect, useRef } from "react";
import { View, Route } from "react-native";
import * as geometry from "spherical-geometry-js";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { ThunkAction } from "redux-thunk";
import { CText as Text, SaveRouteForm, Modal } from "../../components";
import { GLOBAL } from "../../styles/global";
import { ISaveRouteForm } from "../../components/SaveRouteForm";
import { RouteData, StoreState, IRouteSaveState } from "../../redux/store/types";
import { getModalButtons } from "../../utils/modal";

interface Props {
  distanceUnit: string;
  saveRoute: (route: RouteData) => ThunkAction<void, StoreState, undefined, any>;
  clearLastId: () => ThunkAction<void, StoreState, undefined, any>;
  routeState: IRouteSaveState;
}

const formKeyToPrettyName: { [key: string]: string } = {
  start: "Startpoint name",
  end: "Endpoint name",
  method: "Method",
  title: "Trip title"
};

const SaveRoute: React.FC<Props> = ({ distanceUnit, saveRoute, routeState, clearLastId }) => {
  const { navigate } = useNavigation();

  const distance: { start: MapboxGL.Coordinates; end: MapboxGL.Coordinates } = useNavigationParam("distance");
  const duration: number = useNavigationParam("duration");
  const route: MapboxGL.Coordinates[] = useNavigationParam("route");
  const didMount = useRef(false);

  const [isModalVisible, setModalVisibility] = useState(false);
  const [modalValidationMessage, setModalValidationMessage] = useState("");

  useEffect(() => {
    if (didMount.current) {
      clearLastId();
    }
  }, [clearLastId]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const { loading, finished, lastInsertId: id } = routeState;
    if (!loading && finished && id) {
      navigate("RouteDetail", { routeId: id });
    }
  }, [routeState, navigate]);

  const distanceInMeters = useMemo(() => {
    const { latitude: startLat, longitude: startLong } = distance.start;
    const { latitude: endLat, longitude: endLong } = distance.end;
    return geometry.computeDistanceBetween([startLat, startLong], [endLat, endLong]);
  }, [distance]);

  const onModalClose = useCallback(() => setModalVisibility(false), []);

  const modalButtons = useMemo(() => getModalButtons({ label: "Ok", callback: onModalClose }), [onModalClose]);

  const computeErrorMessages = (formData: ISaveRouteForm) =>
    Object.entries(formData).reduce((acc, cur) => {
      const curKey = cur[0];
      const curVal = cur[1];

      if (!curVal) {
        acc.push(formKeyToPrettyName[curKey]);
      }

      return acc;
    }, [] as string[]);

  const onRouteSave = (formData: ISaveRouteForm) => {
    const errorMessages = computeErrorMessages(formData);
    if (errorMessages.length) {
      const missingFields = errorMessages.join(", ");
      setModalValidationMessage(`The following fields are not filled in: ${missingFields}.`);
      setModalVisibility(true);
      return;
    }

    const { distance: formDataDistance, end, start, duration: formDataDuration, title, method } = formData;
    if (!(formDataDistance && end && start && formDataDuration && title && method)) {
      return;
    }

    const routeData: RouteData = {
      distance: formDataDistance,
      end,
      start,
      duration: formDataDuration,
      title,
      method,
      coordinates: route
    };
    saveRoute(routeData);
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
export default SaveRoute;
