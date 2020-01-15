import prettyMilliseconds from "pretty-ms";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { computeDistanceBetween } from "spherical-geometry-js";
import _ from "lodash";

const YARDS_IN_METERS = 1.093613;
const METERS_IN_KILOMETERS = 1000;
const MILES_IN_METERS = 0.00062137;

export const metersToYards = (m: number): number => {
  return YARDS_IN_METERS * m;
};

export const metersToKilometers = (m: number): number => {
  return m / METERS_IN_KILOMETERS;
};

export const metersToMiles = (m: number) => {
  return MILES_IN_METERS * m;
};

const distanceUnitMap: { [key: string]: (m: number) => number } = {
  km: metersToKilometers,
  miles: metersToMiles
};

export const metersToUnit = (distance: number, distanceUnit: string) => {
  return _.round(distanceUnitMap[distanceUnit](distance), 2);
};

export const prettyDuration = (duration: number) => prettyMilliseconds(duration);

export const computeRouteDistance = (route: MapboxGL.Coordinates[]) => {
  const start = route[0];
  const end = route[route.length - 1];
  if (start && end) {
    const from = { lat: start.latitude, long: start.longitude };
    const to = { lat: end.latitude, long: end.longitude };
    return computeDistanceBetween(from, to);
  }
  return 0;
};
