import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View } from "react-native";
import { HelperText } from "react-native-paper";
import Input from "../Input";
import Button from "../Button";
import store from "../../redux/store";
import { prettyDuration, metersToUnit } from "../../utils/units";
import { travelingMethodsArray, TravelingMethod } from "../../utils/supportedTravelingMethods";
import { toTitleCase } from "../../utils/string";
import Dropdown, { DropdownData } from "../Dropdown";

interface Props {
  title?: string;
  distance?: number;
  duration?: number;
  method?: TravelingMethod;
  start?: string;
  end?: string;
  onSubmit?: (routeDetails: ISaveRouteForm) => void;
}

export interface ISaveRouteForm {
  title?: string;
  distance?: number;
  duration?: number;
  method?: TravelingMethod;
  start?: string;
  end?: string;
}

const SaveRouteForm: React.FC<Props> = ({ title, distance, duration, method, start, end, onSubmit }) => {
  const [formState, setFormState] = useState<ISaveRouteForm>({ title, distance, duration, method, start, end });
  const [helperTextVisiblity, setHelperTextVisibility] = useState(false);

  const { distanceUnit } = store.getState().settings;

  const updateformState = useCallback((propName: string) => {
    return (value: string) => {
      setFormState((state: ISaveRouteForm) => ({ ...state, [propName]: value }));
    };
  }, []);

  const onPress = () => {
    setHelperTextVisibility(true);
    if (onSubmit) {
      onSubmit(formState);
    }
  };

  const getHelperText = (propName: string) =>
    helperTextVisiblity && (
      <HelperText type="error" visible={!formState[propName]}>
        Required
      </HelperText>
    );

  const travelingMethod = useMemo(
    () => travelingMethodsArray.map(m => ({ label: toTitleCase(m), value: toTitleCase(m) })),
    []
  );

  const handleDropDown = (item: DropdownData) => updateformState("method")(item.value);
  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <View>
          <Input
            label="Trip title"
            error={helperTextVisiblity && !formState.title?.length}
            value={formState.title}
            onChangeText={updateformState("title")}
          />
          {getHelperText("title")}
        </View>
        <View>
          <Input
            label="Startpoint name"
            error={helperTextVisiblity && !formState.start?.length}
            value={formState.start}
            onChangeText={updateformState("start")}
          />
          {getHelperText("start")}
        </View>
        <View>
          <Input
            label="Endpoint name"
            error={helperTextVisiblity && !formState.end?.length}
            value={formState.end}
            onChangeText={updateformState("end")}
          />
          {getHelperText("end")}
        </View>
        <View>
          <Dropdown
            onChangeText={handleDropDown}
            defaultValue={formState.method}
            label="Method"
            data={travelingMethod}
          />
        </View>
        <Input
          editable={false}
          label="Distance"
          value={`${metersToUnit(distance, distanceUnit).toFixed(2)} ${distanceUnit}`}
          onChangeText={updateformState("distance")}
        />
        <Input
          editable={false}
          label="Duration"
          value={prettyDuration(duration)}
          onChangeText={updateformState("duration")}
        />
      </View>
      <Button text="Save route" block onPress={onPress} />
    </>
  );
};

export default SaveRouteForm;
