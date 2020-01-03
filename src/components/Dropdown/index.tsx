import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { Picker, View } from "react-native";
import { Input } from "..";

interface DropdownData {
  label: string;
  value: any;
}

interface Props {
  data: DropdownData[];
  label: string;
  defaultValue?: string;
  onChangeText?: (item: DropdownData, itemIndex: number) => void;
}

const dropdown: React.FC<Props> = memo(({ data, label, defaultValue, onChangeText }) => {
  const handleValueChange = useCallback(
    (item: DropdownData, itemIndex: number) => {
      if (onChangeText) {
        const selectedItem = data[itemIndex];
        onChangeText(selectedItem, itemIndex);
      }
    },
    [onChangeText]
  );

  const pickerItems = React.useMemo(
    () =>
      data.map((item: DropdownData, index: number) => (
        <Picker.Item key={`i-${index}`} label={item.label} value={item.value} />
      )),
    [data]
  );

  return (
    <View style={{ position: "relative" }}>
      <Input label={label} value=" " editable={false} />
      <Picker
        style={{ position: "absolute", top: 17, left: 4, right: 0, zIndex: 100 }}
        onValueChange={handleValueChange}
        selectedValue={defaultValue}
      >
        {pickerItems}
      </Picker>
    </View>
  );
});

export default dropdown;
