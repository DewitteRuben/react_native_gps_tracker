import React from "react";
import { CircleButton, Icon } from "..";

const locationFAB: React.FC = () => {
  return (
    <CircleButton onPress={() => console.log("test")}>
      <Icon type="MaterialIcons" color="rgba(0, 0, 0, 0.54);" size={32} name={"my-location"} />
    </CircleButton>
  );
};

export default locationFAB;
