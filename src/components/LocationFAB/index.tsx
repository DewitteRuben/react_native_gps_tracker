import React, { memo } from "react";
import Icon from "../Icon";
import CircleButton from "../CircleButton";
import { GLOBAL } from "../../styles/global";

interface Props {
  onPress: () => void;
  isFollowing: boolean;
}

const locationFAB = memo<Props>(({ onPress, isFollowing }) => {
  return (
    <CircleButton onPress={onPress}>
      <Icon
        type="MaterialIcons"
        color={isFollowing ? GLOBAL.MAIN.green : GLOBAL.MAIN.buttonGray}
        size={32}
        name="my-location"
      />
    </CircleButton>
  );
});

export default locationFAB;
