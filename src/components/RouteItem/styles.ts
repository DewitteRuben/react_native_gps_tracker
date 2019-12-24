import { StyleSheet, Platform, ColorPropType, AdSupportIOS } from "react-native";

const card = StyleSheet.create({
  default: {
    flex: 0,
    padding: 15,
    shadowColor: "#000",
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
});

export default card;
