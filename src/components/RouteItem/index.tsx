import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import CText from "../CText";
import { Icon } from "../../components";

interface Props {
  title: string;
  type: "bus" | "train" | "train" | "walking" | "plane";
  startPoint: string;
  endPoint: string;
  date: Date;
  duration: Date;
  distance: number;
}

const typeToIconMap = {
  bus: "bus",
  train: "train",
  walking: "walking",
  plane: "plane-departure"
};

const routeItem: React.FC<Props> = ({ title, type, startPoint, endPoint, date, duration, distance }) => {
  return (
    <TouchableOpacity style={styles.default}>
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
        <CText bold text={title} />
        <Icon type="FontAwesome" name="trash" size={21} />
      </View>
      <View
        style={{ flex: 0, flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 5 }}
      >
        <View style={{ position: "relative", width: "100%" }}>
          <Icon
            style={{ position: "absolute", left: 0, top: 0 }}
            type="FontAwesome5"
            name={typeToIconMap[type]}
            size={21}
          />
          <CText align="center" text={`${startPoint} → ${endPoint}`} />
          <CText align="center" text={distance + "km"} />
        </View>
      </View>
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}>
        <CText text="15m" />
        <CText text="29/11/2019 1:20PM" variant="subtitle1" />
      </View>
    </TouchableOpacity>
  );
};

export default routeItem;
