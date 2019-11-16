import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 25,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 4,
    height: Math.round(Dimensions.get("window").height) / 3,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default styles;
