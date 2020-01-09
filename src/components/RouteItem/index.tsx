import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import CText from "../CText";
import { Icon } from "../../components";
import moment from "moment";

interface Props {
  title: string;
  type: "bus" | "train" | "train" | "walking" | "plane";
  startPoint: string;
  endPoint: string;
  date: string;
  duration: string | number;
  distance: number | string;
  onPress?: () => void;
}

const typeToIconMap = {
  bus: "bus",
  train: "train",
  walking: "walking",
  plane: "plane-departure"
};

const routeItem: React.FC<Props> = ({ title, type, startPoint, endPoint, date, duration, distance, onPress }) => {
  return (
    <TouchableOpacity style={styles.default} onPress={onPress}>
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
        <CText bold variant="h3" text={title} />
        <Icon type="FontAwesome5" name={typeToIconMap[type]} size={21} />
      </View>
      <View
        style={{ flex: 0, flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 5 }}
      >
        <View style={{ position: "relative", width: "100%" }}>
          <View style={{ marginBottom: 10 }}>
            <CText align="center" text={`${startPoint} → ${endPoint}`} />
            <CText align="center" text={distance} />
          </View>
        </View>
      </View>
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
        <CText text={duration} />
        <CText text={date} variant="subtitle1" />
      </View>
    </TouchableOpacity>
  );
};

export default routeItem;
