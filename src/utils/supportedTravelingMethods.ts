const travelingMethodsArray = ["bus", "train", "walk", "plane", "car"] as const;
type TravelingMethod = typeof travelingMethodsArray[number];

const [bus, train, walking, plane, car] = travelingMethodsArray;

const typeToIconMap: Record<TravelingMethod, string> = {
  [bus]: "bus",
  [train]: "train",
  [walking]: "walking",
  [plane]: "plane-departure",
  [car]: "car"
};

export { TravelingMethod, typeToIconMap, travelingMethodsArray };
