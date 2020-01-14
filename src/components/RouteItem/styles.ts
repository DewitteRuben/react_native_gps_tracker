import { StyleSheet, Platform, ColorPropType, AdSupportIOS } from "react-native";

const card = StyleSheet.create({
  container: {
    padding: 15
  },
  firstContainer: { flexDirection: "row", justifyContent: "space-between" },
  middleContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 5 },
  lastContainer: { flexDirection: "row", justifyContent: "space-between" },
  travelInfo: { marginBottom: 10 }
});

export default card;
