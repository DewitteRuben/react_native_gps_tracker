import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  localStream: { position: "absolute", zIndex: 50, left: 0, bottom: 30, width: 100, height: 100 },
  remoteStream: { position: "absolute", zIndex: 50, right: 20, top: 30, width: 200, height: 200 }
});

export default styles;
