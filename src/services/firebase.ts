import database from "@react-native-firebase/database";
import MapboxGL from "@react-native-mapbox-gl/maps";
import getUUID from "../utils/uuid";

export const fbUpdateCoords = async (coords: MapboxGL.Coordinates) => {
  try {
    const UUID = await getUUID();
    const ref = database().ref(`users/${UUID}`);
    await ref.set(coords);
  } catch (error) {
    throw new Error(error);
  }
};
