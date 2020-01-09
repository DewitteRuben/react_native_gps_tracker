import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { Picker, View } from "react-native";
import { Input } from "..";

export interface DropdownData {
  label: string;
  value: any;
}

interface Props {
  data: DropdownData[] | string[];
  label: string;
  defaultValue?: string;
  onChangeText?(item: DropdownData | string, itemIndex: number): void;
}

const dropdown: React.FC<Props> = memo(({ data, label, defaultValue, onChangeText }) => {
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
    [onChangeText]
  );

  const pickerItems = React.useMemo(
    () =>
      // typescript Call signatures of union types bug.. therefore any is used
      (data as any).map((item: DropdownData | string, index: number) => {
        const value = typeof item === "string" ? item : item.value;
        return <Picker.Item key={`i-${index}`} label={value} value={value} />;
      }),
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
