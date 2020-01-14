import * as React from "react";
import { View } from "react-native";
import styles from "./styles";

const mapOverlay: React.FC = ({ children }) => {
  return (
    <View style={styles.overlayContainer}>
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );
};

export default mapOverlay;
