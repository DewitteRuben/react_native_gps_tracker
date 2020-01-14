import { StyleSheet, Platform } from "react-native";

export const widgetPaddingValue = 16;

const LAYOUT = StyleSheet.create({
  container: {
    flex: 1
  },
  absolutePos: {
    position: "absolute"
  },
  flexRow: {
    flexDirection: "row"
  },
  relativePos: {
    position: "relative"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifySpaceBetween: {
    justifyContent: "space-between"
  },
  alignCenter: {
    alignItems: "center"
  },
  flexCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  gray: "#A8A8A8",
  white: "#FFFFFF",
  lighterWhite: "#FAFAFA",
  lightGray: "#CCCCCC",
  buttonGray: "rgba(0, 0, 0, 0.54);"
};

const MAP = {
  line: { lineWidth: 3, lineColor: "#F7455D" }
};

const GLOBAL = {
  LAYOUT,
  MAIN,
  MAP
};

export { GLOBAL };
