import React from "react";
import { View } from "react-native";
import RNModal, { ModalProps } from "react-native-modal";
import shortid from "shortid";

import { CText as Text } from "..";
import Button from "../Button";
import styles from "./styles";
import { GLOBAL } from "../../styles/global";

export interface ButtonData {
  onPress: () => any;
  text: string;
  style?: object;
}

interface Props extends Partial<ModalProps> {
  buttons: ButtonData[];
  text: string;
}

const modal: React.FC<Props> = React.memo(({ onSwipeComplete, onBackdropPress, isVisible, text, buttons }) => {
  return (
    <RNModal
      onSwipeComplete={onSwipeComplete}
      useNativeDriver
      animationIn="zoomIn"
      hideModalContentWhileAnimating
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}
    >
      <View style={styles.container}>
        <View style={[GLOBAL.LAYOUT.container, GLOBAL.LAYOUT.justifyCenter]}>
          <Text align="center" text={text} />
        </View>
        <View style={styles.content}>
          {buttons.map((button, index) => (
            <Button
              text={button.text}
              key={shortid()}
              onPress={button.onPress}
              containerStyle={{ ...button.style, marginHorizontal: 5 }}
            />
          ))}
        </View>
      </View>
    </RNModal>
  );
});

export default modal;
