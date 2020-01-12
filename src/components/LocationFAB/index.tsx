import React, { memo } from "react";
import Icon from "../Icon";
import CircleButton from "../CircleButton";

interface Props {
  onPress: () => void;
  isFollowing: boolean;
}

const locationFAB = memo<Props>(({ onPress, isFollowing }) => {
  return (
    <CircleButton onPress={onPress}>
      <Icon type="MaterialIcons" color={isFollowing ? "red" : "rgba(0, 0, 0, 0.54);"} size={32} name="my-location" />
    </CircleButton>
  );
});

export default locationFAB;
