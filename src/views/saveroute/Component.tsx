import React, { useMemo, useState, useCallback, Dispatch, useEffect, useRef } from "react";
import { View, Route, BackHandler } from "react-native";
import * as geometry from "spherical-geometry-js";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import { ThunkAction } from "redux-thunk";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { CText as Text, SaveRouteForm, Modal, BackArrowButton } from "../../components";
import { GLOBAL } from "../../styles/global";
import { ISaveRouteForm } from "../../components/SaveRouteForm";
import { RouteData, StoreState, IRouteSaveState } from "../../redux/store/types";
import { getModalButtons } from "../../utils/modal";
import { ROUTES } from "../../navigators/navigation";
import styles from "./styles";

interface Props {
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

const SaveRoute: React.FC<Props> = ({ saveRoute, routeState, clearLastId }) => {
  const { navigate } = useNavigation();

  const distance: number = useNavigationParam("distance");
  const duration: number = useNavigationParam("duration");
  const route: any[] = useNavigationParam("route");

  const didMount = useRef(false);

  const [isModalVisible, setModalVisibility] = useState(false);
  const [modalValidationMessage, setModalValidationMessage] = useState("");

  const backHandler = useCallback(() => navigate(ROUTES.TAB_MAP), [navigate]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);
  }, [backHandler]);

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
    if (!loading && finished) {
      navigate(ROUTES.ROUTE_DETAIL, { routeId: id });
    }
  }, [routeState, navigate]);

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
      id: uuidv4(),
      date: moment().toISOString(),
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
        <View style={styles.backArrowContainer}>
          <BackArrowButton onPress={backHandler} />
        </View>
        <Text text="Save route" bold variant="h2" />
        <SaveRouteForm distance={distance} onSubmit={onRouteSave} duration={duration} />
      </View>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        onBackdropPress={onModalClose}
        text={modalValidationMessage}
        buttons={modalButtons}
      />
    </>
  );
};
export default SaveRoute;
