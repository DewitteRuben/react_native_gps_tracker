import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import CText from "../CText";
import Icon from "../Icon";
import { TravelingMethod, typeToIconMap } from "../../utils/supportedTravelingMethods";
import { GLOBAL } from "../../styles/global";

interface Props {
  title: string;
  type: TravelingMethod;
  startPoint: string;
  endPoint: string;
  date: string;
  duration: string | number;
  distance: number | string;
  onPress?: () => void;
}

const RouteItem: React.FC<Props> = ({ title, type, startPoint, endPoint, date, duration, distance, onPress }) => {
  return (
    <TouchableOpacity style={[GLOBAL.LAYOUT.shadow, styles.container]} onPress={onPress}>
      <View style={styles.firstContainer}>
        <CText bold variant="h3" text={title} />
        <Icon type="FontAwesome5" name={typeToIconMap[type.toLowerCase() as TravelingMethod]} size={21} />
      </View>
      <View style={styles.middleContainer}>
        <View>
          <View style={styles.travelInfo}>
            <CText align="center" text={`${startPoint} → ${endPoint}`} />
            <CText align="center" text={distance} />
          </View>
        </View>
      </View>
      <View style={styles.lastContainer}>
        <CText text={duration} variant="subtitle1" />
        <CText text={date} variant="subtitle1" />
      </View>
    </TouchableOpacity>
  );
};

export default RouteItem;
