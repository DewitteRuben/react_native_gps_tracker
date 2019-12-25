import { AsyncStorage } from "react-native";
import shortid from "shortid";

const UUID_KEY = "STORE_UUID";

const getUUID = async () => {
  try {
    const UUID = await AsyncStorage.getItem(UUID_KEY);
    if (!UUID) {
      const newUUID = shortid.generate();
      AsyncStorage.setItem(UUID_KEY, newUUID);
      return newUUID;
    }
    return UUID;
  } catch (error) {
    throw new Error(error);
  }
};

export default getUUID;
