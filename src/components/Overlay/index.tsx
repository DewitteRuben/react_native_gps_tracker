import React from "react";
import { View } from "react-native";
import styles from "./styles";

const overlay: React.FC = props => (
  <View style={styles.overlay}>{props.children}</View>
);

export default overlay;
