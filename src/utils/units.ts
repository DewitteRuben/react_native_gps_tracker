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