import { StyleSheet, Platform, ColorPropType } from "react-native";

const button = StyleSheet.create({
  primary: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "50%",
    backgroundColor: "#30be76",
    paddingVertical: 21,
    borderRadius: 6
  },
  block: {
    width: "100%"
  },
  primaryText: {
    fontSize: 18,
    fontFamily: "Nunito-Regular",
    fontWeight: "700",
    color: "white"
  }
});

export default button;
