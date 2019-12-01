import database from "@react-native-firebase/database";
import MapboxGL from "@react-native-mapbox-gl/maps";
import getUUID from "../utils/uuid";

export const fbUpdateLastCoords = async (coords: MapboxGL.Coordinates) => {
  try {
    const UUID = await getUUID();
    const ref = database().ref(`users/${UUID}/last`);
    await ref.set(coords);
  } catch (error) {
    throw new Error(error);
  }
};

export const fbUpdateCoords = async (coords: MapboxGL.Coordinates[]) => {
  try {
    const UUID = await getUUID();
    const ref = database().ref(`users/${UUID}/full`);
    await ref.set(coords);
  } catch (error) {
    throw new Error(error);
  }
};

export const fbClearRoute = async () => {
  try {
    const UUID = await getUUID();
    const ref = database().ref(`users/${UUID}/full`);
    await ref.set(null);
  } catch (error) {
    throw new Error(error);
  }
};
