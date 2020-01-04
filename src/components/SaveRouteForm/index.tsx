import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View } from "react-native";
import { CText as Text, Input, Button, Modal } from "../../components";
import store from "../../redux/store";
import { metersToKilometers, metersToMiles } from "../../utils/units";
import prettyMilliseconds from "pretty-ms";
import { RouteDetails } from "../../views/saveroute/Component";
import { HelperText } from "react-native-paper";

interface Props {
  title?: string;
  distance?: string;
  duration?: string;
  method?: string;
  start?: string;
  end?: string;
  onSubmit?: (routeDetails: RouteDetails) => void;
}

const distanceUnitMap: { [key: string]: (m: number) => number } = {
  km: metersToKilometers,
  miles: metersToMiles
};

const saveRouteForm: React.FC<Props> = React.memo(({ title, distance, duration, method, start, end, onSubmit }) => {
  const [formState, setFormState] = useState<RouteDetails>({ title, distance, duration, method, start, end });
  const [helperTextVisiblity, setHelperTextVisibility] = useState(false);

  const { distanceUnit } = store.getState().settings;

  useEffect(() => {
    setFormState({ ...formState, title, distance, duration, method, start, end });
  }, [title, distance, duration, method, start, end]);

  const updateformState = useCallback(
    (propName: string) => {
      return (value: string) => {
        setFormState({ ...formState, [propName]: value });
      };
    },
    [formState]
  );

  const parsedDistance = useMemo(() => {
    const value = distanceUnitMap[distanceUnit](parseFloat(distance || "0")).toFixed(4);
    return `${value} ${distanceUnit}`;
  }, [distance]);

  const parsedDuration = useMemo(() => {
    return prettyMilliseconds(parseFloat(duration || "0"));
  }, [duration]);

  const onPress = () => {
    if (onSubmit) {
      onSubmit(formState);
    }
    setHelperTextVisibility(true);
  };

  const getHelperText = (propName: string) =>
    helperTextVisiblity && (
      <HelperText type="error" visible={!formState[propName]?.length}>
        This field is mandatory
      </HelperText>
    );

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
          <Input
            label="Method"
            error={helperTextVisiblity && !formState.method?.length}
            value={formState.method}
            onChangeText={updateformState("method")}
          />
          {getHelperText("method")}
        </View>
        <Input editable={false} label="Distance" value={parsedDistance} onChangeText={updateformState("distance")} />
        <Input editable={false} label="Duration" value={parsedDuration} onChangeText={updateformState("duration")} />
      </View>
      <Button text="Save route" block onPress={onPress} />
    </>
  );
});

export default saveRouteForm;
