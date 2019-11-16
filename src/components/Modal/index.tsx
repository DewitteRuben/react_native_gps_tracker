import React from "react";
import { Text, View, StyleProp, ViewStyle, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { Button, CText } from "..";
import Modal, { ModalProps } from "react-native-modal";
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

const modal: React.FC<Props> = ({ onSwipeComplete, swipeDirection, onBackdropPress, isVisible, text, buttons }) => (
  <View>
    <Modal
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
          {buttons.map(button => (
            <Button
              text={button.text}
              onPress={button.onPress}
              containerStyle={{ ...button.style, marginHorizontal: 5 }}
            />
          ))}
        </View>
      </View>
    </Modal>
  </View>
);

export default modal;
