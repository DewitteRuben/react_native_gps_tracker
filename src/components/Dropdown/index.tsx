import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { Picker, View } from "react-native";
import shortid from "shortid";
import Input from "../Input";
import { GLOBAL } from "../../styles/global";
import styles from "./styles";

export interface DropdownData {
  label: string;
  value: any;
}

interface Props {
  data: (DropdownData | string)[];
  label: string;
  defaultValue?: string;
  onChangeText?(item: DropdownData | string, itemIndex: number): void;
}

const Dropdown = memo<Props>(({ data, label, defaultValue, onChangeText }) => {
  useEffect(() => {
    if (onChangeText && !defaultValue) {
      onChangeText(data[0], 0);
    }
  }, [data, defaultValue, onChangeText]);

  const handleValueChange = useCallback(
    (item: DropdownData | string, itemIndex: number) => {
      if (onChangeText) {
        const selectedItem = data[itemIndex];
        onChangeText(selectedItem, itemIndex);
      }
    },
    [onChangeText, data]
  );

  const pickerItems = React.useMemo(
    () =>
      data.map((item: DropdownData | string) => {
        const value = typeof item === "string" ? item : item.value;
        return <Picker.Item key={shortid()} label={value} value={value} />;
      }),
    [data]
  );

  return (
    <View style={GLOBAL.LAYOUT.relativePos}>
      <Input label={label} value=" " editable={false} />
      <Picker style={styles.picker} onValueChange={handleValueChange} selectedValue={defaultValue}>
        {pickerItems}
      </Picker>
    </View>
  );
});

export default Dropdown;
