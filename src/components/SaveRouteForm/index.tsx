import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { CText as Text, Input } from "../../components";

interface Props {
  title?: string;
  distance?: string;
  duration?: string;
  method?: string;
  start?: string;
  end?: string;
}

const saveRouteForm: React.FC<Props> = React.memo(({ title, distance, duration, method, start, end }) => {
  const [formState, setFormState] = useState<Props>({ title, distance, duration, method, start, end });

  useEffect(() => {
    setFormState({ ...formState, title, distance, duration, method, start, end });
  }, [title, distance, duration, method, start, end]);

  const updateformState = useCallback((propName: string) => {
    return (value: string) => {
      setFormState({ ...formState, [propName]: value });
    };
  }, []);

  return (
    <View>
      <Input label="Trip title" value={formState.title} onChangeText={updateformState("title")} />
      <Input label="Startpoint name" value={formState.start} onChangeText={updateformState("start")} />
      <Input label="Endpoint name" value={formState.end} onChangeText={updateformState("end")} />
      <Input label="Method" value={formState.method} onChangeText={updateformState("method")} />
      <Input label="Distance" value={formState.distance} onChangeText={updateformState("distance")} />
      <Input label="Duration" value={formState.duration} onChangeText={updateformState("duration")} />
    </View>
  );
});

export default saveRouteForm;
