import { TouchableWithoutFeedbackProps, StyleProp, TextStyle, ViewStyle, LayoutChangeEvent } from "react-native";

export interface DropDownProps extends TouchableWithoutFeedbackProps {
  data: DropDownData[];
  disabled?: boolean;
  value?: string | number;
  label?: string;
  absoluteRTLLayout?: boolean;
  dropdownOffset?: DropDownOffset;
  dropdownMargins?: DropDownMargins;
  dropdownPosition?: number;
  rippleColor?: string;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleInsets?: DropDownInsets;
  rippleOpacity?: number;
  shadeOpacity?: number;
  rippleDuration?: number;
  animationDuration?: number;
  fontSize?: number;
  labelFontSize?: number;
  textColor?: string;
  itemColor?: string;
  selectedItemColor?: string;
  disabledItemColor?: string;
  baseColor?: string;
  itemTextStyle?: StyleProp<TextStyle>;
  itemCount?: number;
  itemPadding?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  pickerStyle?: StyleProp<ViewStyle>;
  supportedOrientations?: string[];
  useNativeDriver?: boolean;
  hitSlop?: DropDownInsets;

  valueExtractor?(item: DropDownData, index: number): string;
  labelExtractor?(item: DropDownData, index: number): string;
  propsExtractor?(item: DropDownData, index: number): Partial<DropDownProps>;
  onLayout?(event: LayoutChangeEvent): void;
  onFocus?(): void;
  onBlur?(): void;
  onChangeText?(value: string, index: number, data: DropDownData[]): void;
  renderBase?(props: RenderBaseProps): JSX.Element;
  renderAccessory?(): JSX.Element;
}

export interface DropDownData {
  value: string;
  label?: string;
  props?: Partial<DropDownProps>;
}

export interface DropDownOffset {
  top: number;
  left: number;
}

export interface DropDownMargins {
  min: number;
  max: number;
}

export interface DropDownInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface RenderBaseProps extends DropDownProps {
  title: string;
}
