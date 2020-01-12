import React from "react";
import { View } from "react-native";
import styles from "./styles";

const overlay: React.FC = ({ children }) => <View style={styles.overlay}>{children}</View>;

export default overlay;
