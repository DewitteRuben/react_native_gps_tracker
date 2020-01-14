import { StyleSheet } from "react-native";
import { GLOBAL } from "../../styles/global";

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: GLOBAL.MAIN.green,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  barContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
});

export default styles;
