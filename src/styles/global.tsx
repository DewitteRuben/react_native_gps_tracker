import { StyleSheet, Platform } from "react-native";

export const widgetPaddingValue = 16;

const LAYOUT = StyleSheet.create({
  container: {
    flex: 1
  },
  containerPadding: {
    paddingHorizontal: 20
  },
  shadow: {
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

const MAIN = {
  green: "#30be76",
  gray: "#A8A8A8"
};

const GLOBAL = {
  LAYOUT,
  MAIN
};

export { GLOBAL };
