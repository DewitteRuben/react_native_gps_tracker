import React from "react";
import { View } from "react-native";
import RNModal, { ModalProps } from "react-native-modal";
import shortid from "shortid";

import CText from "../CText";
import Button from "../Button";
import styles from "./styles";

export interface ButtonData {
  onPress: () => any;
  text: string;
  style?: object;
}

interface Props extends Partial<ModalProps> {
  buttons: ButtonData[];
  text: string;
}

const modal: React.FC<Props> = React.memo(
  ({ onSwipeComplete, swipeDirection, onBackdropPress, isVisible, text, buttons }) => {
    return (
      <View>
        <RNModal
          onSwipeComplete={onSwipeComplete}
          swipeDirection={swipeDirection}
          onBackdropPress={onBackdropPress}
          isVisible={isVisible}
        >
          <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <CText text={text} />
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
      </View>
    );
  }
);

export default modal;
