import { AsyncStorage } from "react-native";
import v4 from "uuid/v4";

const UUID_KEY = "STORE_UUID";

const getUUID = async () => {
  try {
    const UUID = await AsyncStorage.getItem(UUID_KEY);
    if (!UUID) {
      const newUUID = v4();
      AsyncStorage.setItem(UUID_KEY, newUUID);
      return newUUID;
    }
    return UUID;
  } catch (error) {
    throw new Error(error);
  }
};

export default getUUID;
