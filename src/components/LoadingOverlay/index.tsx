import React from "react";
import { View } from "react-native";
import Spinner from "../Spinner";
import { GLOBAL } from "../../styles/global";

const loadingOverlay: React.FC = () => {
  return (
    <View style={GLOBAL.LAYOUT.flexCenter}>
      <Spinner />
    </View>
  );
};

export default loadingOverlay;
