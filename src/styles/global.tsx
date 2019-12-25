import { StyleSheet, Platform } from "react-native";

export const widgetPaddingValue = 16;

const LAYOUT = StyleSheet.create({
  container: {
    flex: 1
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7
  }
});

const GLOBAL = {
  LAYOUT
};

export { GLOBAL };
