import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ActivityIndicator } from "react-native-paper";
import { GLOBAL } from "../../styles/global";

const spinner: React.FC = props => <ActivityIndicator animating size="large" color={GLOBAL.MAIN.green} />;

export default spinner;
