import database from "@react-native-firebase/database";
import MapboxGL from "@react-native-mapbox-gl/maps";
import store from "../redux/store";

export const fbUpdateLastCoords = async (coords: MapboxGL.Coordinates) => {
  try {
    const trackingId = store.getState().settings.trackingId;
    const ref = database().ref(`users/${trackingId}/last`);
    await ref.set(coords);
  } catch (error) {
    throw new Error(error);
  }
};

export const fbUpdateCoords = async (coords: MapboxGL.Coordinates[]) => {
  try {
    const trackingId = store.getState().settings.trackingId;
    const ref = database().ref(`users/${trackingId}/full`);
    await ref.set(coords);
  } catch (error) {
    throw new Error(error);
  }
};

export const fbClearRoute = async () => {
  try {
    const trackingId = store.getState().settings.trackingId;
    const ref = database().ref(`users/${trackingId}/full`);
    await ref.set(null);
  } catch (error) {
    throw new Error(error);
  }
};
