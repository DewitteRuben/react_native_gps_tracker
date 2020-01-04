import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View } from "react-native";
import { CText as Text, Input } from "../../components";
import store from "../../redux/store";
import { metersToKilometers, metersToMiles } from "../../utils/units";
import prettyMilliseconds from "pretty-ms";

interface Props {
  title?: string;
  distance?: string;
  duration?: string;
  method?: string;
  start?: string;
  end?: string;
}

const distanceUnitMap: { [key: string]: (m: number) => number } = {
  km: metersToKilometers,
  miles: metersToMiles
};

const saveRouteForm: React.FC<Props> = React.memo(({ title, distance, duration, method, start, end }) => {
  const [formState, setFormState] = useState<Props>({ title, distance, duration, method, start, end });
  const { distanceUnit } = store.getState().settings;

  useEffect(() => {
    setFormState({ ...formState, title, distance, duration, method, start, end });
  }, [title, distance, duration, method, start, end]);

  const updateformState = useCallback((propName: string) => {
    return (value: string) => {
      setFormState({ ...formState, [propName]: value });
    };
  }, []);

  const parsedDistance = useMemo(() => {
    const value = distanceUnitMap[distanceUnit](parseFloat(distance || "0")).toFixed(4);
    return `${value} ${distanceUnit}`;
  }, [distance]);

  const parsedDuration = useMemo(() => {
    return prettyMilliseconds(parseFloat(duration || "0"));
  }, [duration]);

  return (
    <View>
      <Input label="Trip title" value={formState.title} onChangeText={updateformState("title")} />
      <Input label="Startpoint name" value={formState.start} onChangeText={updateformState("start")} />
      <Input label="Endpoint name" value={formState.end} onChangeText={updateformState("end")} />
      <Input label="Method" value={formState.method} onChangeText={updateformState("method")} />
      <Input editable={false} label="Distance" value={parsedDistance} onChangeText={updateformState("distance")} />
      <Input editable={false} label="Duration" value={parsedDuration} onChangeText={updateformState("duration")} />
    </View>
  );
});

export default saveRouteForm;
