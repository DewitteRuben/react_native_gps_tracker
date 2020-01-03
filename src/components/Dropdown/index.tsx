import React, { useRef, useState, useEffect, useCallback } from "react";
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

const dropdown: React.FC<Props> = React.memo(({ data, label, defaultValue, onChangeText }) => {
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    if (defaultValue) {
      const value = data.filter(item => item.label === defaultValue)[0];
      setSelectedValue(value);
    }
  }, []);

  const handleValueChange = useCallback(
    (item: DropdownData, itemIndex: number) => {
      if (onChangeText) {
        const item = data[itemIndex];
        onChangeText(item, itemIndex);
      }
      setSelectedValue(item);
    },
    [onChangeText]
  );

  return (
    <View style={{ position: "relative" }}>
      <Input label={label} value=" " editable={false} />
      <Picker
        style={{ position: "absolute", top: 17, left: 4, right: 0, zIndex: 100 }}
        onValueChange={handleValueChange}
        selectedValue={selectedValue}
      >
        {data.map((item: DropdownData, index: number) => (
          <Picker.Item key={`i-${index}`} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
});

export default dropdown;
