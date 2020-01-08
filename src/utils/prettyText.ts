import prettyMilliseconds from "pretty-ms";
import { metersToKilometers, metersToMiles } from "./units";

const distanceUnitMap: { [key: string]: (m: number) => number } = {
  km: metersToKilometers,
  miles: metersToMiles
};

export const prettyDistance = (distance: string, distanceUnit: string) => {
  const value = distanceUnitMap[distanceUnit](parseFloat(distance)).toFixed(4);
  return `${value} ${distanceUnit}`;
};

export const prettyDuration = (duration: string) => prettyMilliseconds(parseFloat(duration));
