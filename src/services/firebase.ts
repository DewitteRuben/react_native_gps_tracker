import database from "@react-native-firebase/database";
import MapboxGL from "@react-native-mapbox-gl/maps";

const FB_REF = {
  USERS: database().ref("users/"),
};

export const fbTest = async (coords: MapboxGL.Coordinates) => {
  await FB_REF.USERS.set(coords);
};
