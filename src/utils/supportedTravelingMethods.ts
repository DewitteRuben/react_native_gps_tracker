const travelingMethodsArray = ["bus", "train", "walk", "plane"] as const;
type TravelingMethod = typeof travelingMethodsArray[number];

const [bus, train, walking, plane] = travelingMethodsArray;

const typeToIconMap: Record<TravelingMethod, string> = {
  [bus]: "bus",
  [train]: "train",
  [walking]: "walking",
  [plane]: "plane-departure"
};

export { TravelingMethod, typeToIconMap, travelingMethodsArray };
