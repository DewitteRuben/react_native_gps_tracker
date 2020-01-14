import { StyleSheet } from "react-native";
import { GLOBAL } from "../../styles/global";

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    backgroundColor: GLOBAL.MAIN.lighterWhite,
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 10
  }
});

export default styles;
